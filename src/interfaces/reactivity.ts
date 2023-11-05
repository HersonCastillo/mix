import { ClassType } from './class-type';

export interface ReactivityProps {
  state: <T>(initialValue: T) => [T, (value: T) => void];
  params: () => Record<string, string>;
  provide: <T>(Provider: ClassType<T>) => T;
}
