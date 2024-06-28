import { from } from '../context';
import { generateUniqueId } from '../shared/unique-id';
import { fragment } from './component';

export type Signal<T> = {
  id: string;
  set: (value: T, emit?: boolean) => void;
  get: () => T | undefined;
  history: () => Record<number, T>;
  fragment: DocumentFragment;
};

export const signal = <T>(value: T): Signal<T> => {
  const registry = { [new Date().getTime()]: value };
  const id = generateUniqueId();
  const event = new CustomEvent(id);
  const element = fragment();

  const getValue = () => {
    const recent =
      Object.keys(registry)
        .sort((a, b) => Number(b) - Number(a))
        .at(0) ?? null;

    return recent ? registry[+recent] : undefined;
  };

  return {
    id,
    fragment: element,
    set: (value, emit = true) => {
      if (typeof value !== 'object' && value === getValue()) {
        return;
      }

      registry[new Date().getTime()] = value;

      if (emit) {
        element.dispatchEvent(event);
      }
    },
    get: (): T | undefined => {
      return getValue();
    },
    history: () => registry,
  };
};

export const effects = (callback: VoidFunction, signals: Signal<unknown>[]) => {
  signals.forEach((signal) =>
    signal.fragment.addEventListener(signal.id, callback),
  );

  return {
    destroy: () =>
      signals.forEach((signal) => {
        signal.fragment.removeEventListener(signal.id, callback);
        signal.fragment.parentNode?.removeChild(signal.fragment);
      }),
  };
};

export const listen = <T>(
  elementCallback: (value: T | undefined) => HTMLElement,
  signal: Signal<T>,
) => {
  const current$ = from(elementCallback(signal.get()));

  const callback = () => current$.next(elementCallback(signal.get()));

  signal.fragment.addEventListener(signal.id, callback);

  return current$;
};
