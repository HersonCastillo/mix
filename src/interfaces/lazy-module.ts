export type LazyModule<T, K = () => T> = Promise<{
  default: K;
}>;
