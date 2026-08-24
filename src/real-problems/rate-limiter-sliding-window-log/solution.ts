// todo. Доделать очистку map

class CycledBufferQueue<T> {
  private head_ = 0;
  private tail_ = 0;
  private size_ = 0;
  private arr_: T[];

  constructor(private maxSize_: number) {
    this.arr_ = new Array(maxSize_);
  }

  get size() {
    return this.size_;
  }

  isEmpty() {
    return this.size_ === 0;
  }

  isFull() {
    return this.size_ === this.maxSize_;
  }

  enqueue(value: T): boolean {
    if (this.size_ === this.maxSize_) {
      return false;
    }

    if (this.isEmpty()) {
      this.size_ += 1;
      this.arr_[this.head_] = value;
      return true;
    }

    this.size_ += 1;
    this.tail_ = (this.tail_ + 1) % this.maxSize_;
    this.arr_[this.tail_] = value;
    return true;
  }

  peekFront(): T | null {
    if (this.size_ === 0) {
      return null;
    }

    return this.arr_[this.head_];
  }

  dequeue(): T | null {
    if (this.size_ === 0) {
      return null;
    }

    if (this.size_ === 1) {
      this.size_ -= 1;
      const el = this.arr_[this.head_];
      return el;
    }

    this.size_ -= 1;
    const el = this.arr_[this.head_];
    this.head_ = (this.head_ + 1) % this.maxSize_;
    return el;
  }
}

const ONE_SECOND = 1000;

export function createIpRateLimiter(limit: number) {
  const ipToQueueMap = new Map<string, CycledBufferQueue<number>>();

  return function rateLimit(ip: string): boolean {
    if (!ipToQueueMap.has(ip)) {
      ipToQueueMap.set(ip, new CycledBufferQueue(limit));
    }
    const queue = ipToQueueMap.get(ip)!;

    let backEl = queue.peekFront();
    const now = performance.now();

    while (backEl !== null && now - backEl >= ONE_SECOND) {
      queue.dequeue();
      backEl = queue.peekFront();
    }

    if (queue.isFull()) {
      return false;
    }

    queue.enqueue(now);
    return true;
  };
}
