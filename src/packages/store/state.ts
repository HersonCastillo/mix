import { provide } from '../core';
import { ReducersMap, Store } from './store';

export const createState = <T>(
  state: T,
  reducers: ReducersMap<T>,
): Store<T> => {
  const store = provide<Store<T>>(Store);

  store.init(state, reducers);

  return store;
};
