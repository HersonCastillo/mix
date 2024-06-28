import { ComponentRef } from '../../interfaces';

export const ref = <T extends HTMLElement>(
  effect?: (element: HTMLElement) => void,
): ComponentRef<T> => ({ current: null, effect });
