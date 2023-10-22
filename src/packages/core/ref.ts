import { IComponentRef } from '../../interfaces/component';

export const ref = <T extends HTMLElement>(
  effect?: (element: HTMLElement) => void,
): IComponentRef<T> => ({
  current: null,
  effect,
});
