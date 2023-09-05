export type ILazyModule<T, K = () => T> = Promise<{
  default: K;
}>;
