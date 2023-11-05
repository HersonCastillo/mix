import isEqual from 'lodash.isequal';
import { signal, Signal } from '../core';
import { injectable } from '../core/decorators';

type ReducerFn<T, K = {}> = (state: T, payload: K) => T;
type SignalMap<T, K = unknown> = Record<keyof T, Signal<K>>;

export type ReducersMap<T> = Record<string, ReducerFn<T>>;

@injectable
export class Store<T> {
  private state!: T;
  private reducers: ReducersMap<T> = {};
  private subscription!: SignalMap<T>;

  init(state: T, reducers: ReducersMap<T>) {
    this.state = state;
    this.reducers = reducers;

    this.assignSignals();
  }

  assignSignals() {
    for (const [key, value] of Object.entries(this.state || {})) {
      this.subscription = {
        ...this.subscription,
        [key as keyof T]: signal(value),
      };
    }
  }

  updateSignalValues(except: (keyof T)[]) {
    for (const [key, value] of Object.entries(this.subscription || {})) {
      if (except.includes(key as keyof T)) {
        continue;
      }

      const currentStateValue = this.state[key as keyof T];
      (value as Signal<unknown>).set(currentStateValue, false);
    }
  }

  select<K>(key: keyof T): Signal<K> {
    return this.subscription[key] as Signal<K>;
  }

  dispatch<K>(action: string, payload: K | null, emit: (keyof T)[] = []) {
    const fn = this.reducers[action];

    if (!!fn) {
      const newState = fn(this.state, payload ?? {});
      const prevState = this.state;

      this.state = newState;

      this.updateSignalValues(emit);

      for (const entry of emit) {
        const value = newState[entry];

        // ? Check if prev-value and new-value are the same?
        const isSame =
          (typeof value === 'object' && isEqual(value, prevState[entry])) ||
          (typeof value !== 'object' && value === prevState[entry]);

        this.select(entry).set(value, !isSame);
      }

      return;
    }

    throw new Error(`Action not found for Store: [${action}]`);
  }
}
