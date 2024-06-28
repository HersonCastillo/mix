import { generateUniqueId } from '../shared';

type ObserverCallback<T> = (data: T, id: string) => void;

export class Observable<T> {
  private observers: Map<string, ObserverCallback<T>> = new Map();
  private storedValue: T | undefined;

  value(): T | undefined {
    return this.storedValue;
  }

  unsubscribeAll(): void {
    this.observers.clear();
  }

  unsubscribe(id: string): void {
    this.observers.delete(id);
  }

  transform<K>(fn: (value: T) => K) {
    const transform$ = new Observable<K>();

    this.subscribe((data) => {
      transform$.next(fn(data));
    });

    if (this.storedValue !== undefined) {
      this.next(this.storedValue);
    }

    return transform$;
  }

  subscribe(observer: ObserverCallback<T>) {
    const id = generateUniqueId();
    this.observers.set(id, observer);

    if (this.storedValue !== undefined) {
      this.next(this.storedValue);
    }

    return {
      unsubscribe: () => {
        this.observers.delete(id);
      },
    };
  }

  next(value: T, validate = true): void {
    this.emit(value, validate);
  }

  private emit(data: T, validate = true): void {
    if (validate && typeof data !== 'object' && this.storedValue === data) {
      return;
    }

    for (const [key, observer] of Array.from(this.observers.entries())) {
      observer(data, key);
    }

    this.storedValue = data;
  }
}
