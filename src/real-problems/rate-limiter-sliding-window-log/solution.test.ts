import { createIpRateLimiter } from './solution';

describe('createIpRateLimiter', () => {
  const advanceTo = (time: number) => {
    jest.advanceTimersByTime(time - jest.now());
  };

  beforeEach(() => {
    jest.useFakeTimers({ now: 0 });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('allows requests up to the configured limit', () => {
    const rateLimit = createIpRateLimiter(3);

    expect([rateLimit('ip'), rateLimit('ip'), rateLimit('ip'), rateLimit('ip')]).toEqual([
      true,
      true,
      true,
      false,
    ]);
  });

  test('rejects requests until the oldest request leaves the window', () => {
    const rateLimit = createIpRateLimiter(1);

    expect(rateLimit('ip')).toBe(true);

    advanceTo(999);
    expect(rateLimit('ip')).toBe(false);

    advanceTo(1000);
    expect(rateLimit('ip')).toBe(true);

    advanceTo(1001);
    expect(rateLimit('ip')).toBe(false);

    advanceTo(2000);
    expect(rateLimit('ip')).toBe(true);
  });

  test('expires only requests that are older than the sliding window', () => {
    const rateLimit = createIpRateLimiter(3);

    expect(rateLimit('ip')).toBe(true);

    advanceTo(400);
    expect(rateLimit('ip')).toBe(true);

    advanceTo(800);
    expect(rateLimit('ip')).toBe(true);

    advanceTo(900);
    expect(rateLimit('ip')).toBe(false);

    advanceTo(1001);
    expect(rateLimit('ip')).toBe(true);

    advanceTo(1300);
    expect(rateLimit('ip')).toBe(false);

    advanceTo(1401);
    expect(rateLimit('ip')).toBe(true);
  });

  test('uses an independent sliding window for each IP', () => {
    const rateLimit = createIpRateLimiter(2);

    expect(rateLimit('ip-a')).toBe(true);
    expect(rateLimit('ip-a')).toBe(true);
    expect(rateLimit('ip-a')).toBe(false);

    expect(rateLimit('ip-b')).toBe(true);
    expect(rateLimit('ip-b')).toBe(true);
    expect(rateLimit('ip-b')).toBe(false);

    advanceTo(1001);

    expect(rateLimit('ip-a')).toBe(true);
    expect(rateLimit('ip-b')).toBe(true);
  });

  test('does not reset the limit at a fixed-clock boundary', () => {
    const rateLimit = createIpRateLimiter(2);

    advanceTo(900);
    expect(rateLimit('ip')).toBe(true);

    advanceTo(999);
    expect(rateLimit('ip')).toBe(true);

    advanceTo(1000);
    expect(rateLimit('ip')).toBe(false);

    advanceTo(1901);
    expect(rateLimit('ip')).toBe(true);
  });

  test('reuses circular-buffer capacity after requests expire', () => {
    const rateLimit = createIpRateLimiter(2);

    advanceTo(0);
    expect(rateLimit('ip')).toBe(true);

    advanceTo(1);
    expect(rateLimit('ip')).toBe(true);

    advanceTo(2);
    expect(rateLimit('ip')).toBe(false);

    advanceTo(1002);
    expect(rateLimit('ip')).toBe(true);
    expect(rateLimit('ip')).toBe(true);
    expect(rateLimit('ip')).toBe(false);

    advanceTo(2003);
    expect(rateLimit('ip')).toBe(true);
    expect(rateLimit('ip')).toBe(true);
    expect(rateLimit('ip')).toBe(false);
  });
});
