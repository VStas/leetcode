type Node<T> = {
  value: T;
  next: Node<T> | null;
};

// we could use an array queue (cycled buffer), as we know the size
class Queue<T> {
  private head_: Node<T> | null = null;
  private tail_: Node<T> | null = null;
  private size_ = 0;

  constructor(private maxSize_: number) {}

  get size() {
    return this.size_;
  }

  isEmpty() {
    return this.size_ === 0;
  }

  enqueue(value: T): boolean {
    if (this.size_ === this.maxSize_) {
      return false;
    }
    const node = { value, next: null };

    if (this.isEmpty()) {
      this.size_ += 1;

      this.head_ = node;
      this.tail_ = node;
      return true;
    }
    this.size_ += 1;

    this.tail_!.next = node;
    this.tail_ = node;

    return true;
  }

  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    this.size_ -= 1;

    const result = this.head_!.value;

    this.head_ = this.head_!.next;
    if (this.isEmpty()) {
      this.tail_ = null;
    }

    return result;
  }
}

type Fn = () => void;

class AutoResolveQueue {
  private queue_: Queue<Fn>;
  private timer_: NodeJS.Timeout | null = null;

  private timerHander = () => {
    if (this.queue_.isEmpty()) {
      this.timer_ = null;
      this.emptyCallback_();
      return;
    }

    const fn = this.queue_.dequeue()!;
    fn();
    this.timer_ = setTimeout(this.timerHander, this.delayMs_);
  };

  enqueue(el: Fn): boolean {
    const isSuccess = this.queue_.enqueue(el);

    if (!this.timer_) {
      this.timerHander();
    }

    return isSuccess;
  }

  constructor(
    private delayMs_: number,
    maxSize: number,
    private emptyCallback_: () => void,
  ) {
    this.queue_ = new Queue(maxSize);
  }
}

export function createIpRateLimiter(delayMs: number, queueSize: number) {
  const mapIpToQueue = new Map<string, AutoResolveQueue>();

  return async function rateLimit(ip: string): Promise<boolean> {
    if (!mapIpToQueue.has(ip)) {
      mapIpToQueue.set(
        ip,
        new AutoResolveQueue(delayMs, queueSize, () => {
          mapIpToQueue.delete(ip);
        }),
      );
    }

    const queue = mapIpToQueue.get(ip)!;

    const result = new Promise<boolean>((res) => {
      const isSuccess = queue.enqueue(() => res(true));
      if (!isSuccess) {
        res(false);
      }
    });

    return result;
  };
}
