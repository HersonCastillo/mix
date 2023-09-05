export interface ClassType<T = unknown> extends Function {
  new (...args: unknown[]): T;
}
