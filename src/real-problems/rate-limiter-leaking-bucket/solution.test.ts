import { createIpRateLimiter } from './solution';

type Request = {
  id: string;
  startsAt: number;
  ip?: string;
};

type Resolution = {
  id: string;
  resolvedAt: number;
  value: boolean;
};

type Scenario = {
  delayMs: number;
  queueSize: number;
  requests: Request[];
  expected: Resolution[];
};

async function expectScenario({ delayMs, queueSize, requests, expected }: Scenario) {
  const rateLimit = createIpRateLimiter(delayMs, queueSize);
  const sortedRequests = [...requests].sort((a, b) => a.startsAt - b.startsAt);

  const resolutions: Resolution[] = [];
  const promises: Promise<boolean>[] = [];

  let i = 0;

  while (i < sortedRequests.length) {
    const request = sortedRequests[i];
    const requestTime = request.startsAt;
    const timeToAdvance = requestTime - Date.now();

    await jest.advanceTimersByTimeAsync(timeToAdvance);

    while (i < sortedRequests.length && sortedRequests[i].startsAt === requestTime) {
      const currentRequest = sortedRequests[i];
      promises.push(
        rateLimit(currentRequest.ip ?? 'ip').then((value) => {
          resolutions.push({
            id: currentRequest.id,
            resolvedAt: Date.now(),
            value,
          });
          return value;
        }),
      );

      i++;
    }
  }

  // After processing all scheduled request arrivals:
  await jest.runAllTimersAsync();

  // Assert before Promise.all so a late or unresolved request gives a useful
  // mismatch instead of hanging until Jest's timeout.
  expect(expected).toHaveLength(requests.length);
  expect(resolutions).toEqual(expected);

  await Promise.all(promises);
}

describe('createIpRateLimiter', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: 0 });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('request is rejected when the queue is full', async () => {
    await expectScenario({
      delayMs: 100,
      queueSize: 3,
      requests: [
        { id: 'p1', startsAt: 0 },
        { id: 'p2', startsAt: 0 },
        { id: 'p3', startsAt: 0 },
        { id: 'p4', startsAt: 0 },
        { id: 'p5', startsAt: 0 },
        { id: 'p6', startsAt: 0 },
        { id: 'p7', startsAt: 0 },
      ],
      expected: [
        { id: 'p1', value: true, resolvedAt: 0 },
        { id: 'p5', value: false, resolvedAt: 0 },
        { id: 'p6', value: false, resolvedAt: 0 },
        { id: 'p7', value: false, resolvedAt: 0 },
        { id: 'p2', value: true, resolvedAt: 100 },
        { id: 'p3', value: true, resolvedAt: 200 },
        { id: 'p4', value: true, resolvedAt: 300 },
      ],
    });
  });

  test('request is accepted when the queue is not full again', async () => {
    await expectScenario({
      delayMs: 100,
      queueSize: 3,
      requests: [
        { id: 'p1', startsAt: 0 },
        { id: 'p2', startsAt: 0 },
        { id: 'p3', startsAt: 0 },
        { id: 'p4', startsAt: 0 },
        { id: 'p5', startsAt: 0 },
        { id: 'p6', startsAt: 100 },
      ],
      expected: [
        { id: 'p1', value: true, resolvedAt: 0 },
        { id: 'p5', value: false, resolvedAt: 0 },
        { id: 'p2', value: true, resolvedAt: 100 },
        { id: 'p3', value: true, resolvedAt: 200 },
        { id: 'p4', value: true, resolvedAt: 300 },
        { id: 'p6', value: true, resolvedAt: 400 },
      ],
    });
  });

  test('request waits when it arrives during the cooldown', async () => {
    await expectScenario({
      delayMs: 100,
      queueSize: 3,
      requests: [
        { id: 'p1', startsAt: 0 },
        { id: 'p2', startsAt: 50 },
      ],
      expected: [
        { id: 'p1', value: true, resolvedAt: 0 },
        { id: 'p2', value: true, resolvedAt: 100 },
      ],
    });
  });

  test('request resolves immediately after the bucket becomes inactive', async () => {
    await expectScenario({
      delayMs: 100,
      queueSize: 3,
      requests: [
        { id: 'p1', startsAt: 0 },
        { id: 'p2', startsAt: 150 },
      ],
      expected: [
        { id: 'p1', value: true, resolvedAt: 0 },
        { id: 'p2', value: true, resolvedAt: 150 },
      ],
    });
  });

  test('uses an independent leaking bucket for each IP', async () => {
    await expectScenario({
      delayMs: 100,
      queueSize: 3,
      requests: [
        { id: 'ip-a-1', ip: 'ip-a', startsAt: 0 },
        { id: 'ip-a-2', ip: 'ip-a', startsAt: 1 },
        { id: 'ip-b-1', ip: 'ip-b', startsAt: 50 },
        { id: 'ip-b-2', ip: 'ip-b', startsAt: 51 },
      ],
      expected: [
        { id: 'ip-a-1', value: true, resolvedAt: 0 },
        { id: 'ip-b-1', value: true, resolvedAt: 50 },
        { id: 'ip-a-2', value: true, resolvedAt: 100 },
        { id: 'ip-b-2', value: true, resolvedAt: 150 },
      ],
    });
  });

  test("a full queue for one IP does not reject another IP's request", async () => {
    await expectScenario({
      delayMs: 100,
      queueSize: 1,
      requests: [
        { id: 'ip-a-1', ip: 'ip-a', startsAt: 0 },
        { id: 'ip-a-2', ip: 'ip-a', startsAt: 0 },
        { id: 'ip-a-3', ip: 'ip-a', startsAt: 0 },
        { id: 'ip-b-1', ip: 'ip-b', startsAt: 10 },
      ],
      expected: [
        { id: 'ip-a-1', value: true, resolvedAt: 0 },
        { id: 'ip-a-3', value: false, resolvedAt: 0 },
        { id: 'ip-b-1', value: true, resolvedAt: 10 },
        { id: 'ip-a-2', value: true, resolvedAt: 100 },
      ],
    });
  });

  test('processes staggered requests from the same IP in FIFO order', async () => {
    await expectScenario({
      delayMs: 100,
      queueSize: 3,
      requests: [
        { id: 'p1', startsAt: 0 },
        { id: 'p2', startsAt: 25 },
        { id: 'p3', startsAt: 50 },
      ],
      expected: [
        { id: 'p1', value: true, resolvedAt: 0 },
        { id: 'p2', value: true, resolvedAt: 100 },
        { id: 'p3', value: true, resolvedAt: 200 },
      ],
    });
  });
});
