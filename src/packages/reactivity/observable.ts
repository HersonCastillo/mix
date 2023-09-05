import { generateUniqueId } from '../shared';

type ObserverCallback<T> = (data: T, id: string) => void;

export class Observable<T> {
  private observers: Map<string, ObserverCallback<T>> = new Map();
  private storeValue: T | undefined;

  getFreezedValue(): T | undefined {
    return this.storeValue;
  }

  unsubscribeAll(): void {
    this.observers.clear();
  }

  unsubscribe(id: string): void {
    this.observers.delete(id);
  }

  subscribe(observer: ObserverCallback<T>) {
    const id = generateUniqueId();
    this.observers.set(id, observer);

    if (this.storeValue) {
      this.emit(this.storeValue);
    }

    return {
      unsubscribe: () => {
        this.observers.delete(id);
      },
    };
  }

  emit(data: T): void {
    if (typeof data !== 'object' && this.storeValue === data) {
      return;
    }

    for (const [key, observer] of Array.from(this.observers.entries())) {
      observer(data, key);
    }

    this.storeValue = data;
  }

  pipe<K>(...transformFns: ((data: T) => K)[]): Observable<K> {
    const newObservable = new Observable<K>();

    const newObserver: ObserverCallback<T> = (data) => {
      let transformedData = data;

      for (const transformFn of transformFns) {
        transformedData = transformFn(transformedData) as never;
      }

      newObservable.emit(transformedData as never);
    };

    this.subscribe(newObserver);

    return newObservable;
  }
}
