import { ClassType } from './class-type';

export interface IReactivityProps {
  state: <T>(initialValue: T) => [T, (value: T) => void];
  params: () => Record<string, string>;
  provide: <T>(Provider: ClassType<T>) => T;
}
