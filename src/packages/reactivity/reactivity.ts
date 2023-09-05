import { IReactivityProps } from 'interfaces/reactivity';
import { provide, state } from 'packages/core';
import { params } from 'packages/routing';
import { Observable } from './observable';

export const fromEvent = <T extends HTMLElement, K>(
  element: T,
  eventName: keyof HTMLElementEventMap,
) => {
  const observable$ = new Observable<Event>();

  const onEvent = (event: Event) => {
    observable$.emit(event);
  };

  element.addEventListener(eventName, onEvent);

  return observable$;
};

export const from = <T = any>(initialValue: T) => {
  const observable$ = new Observable<T>();

  observable$.emit(initialValue);

  return observable$;
};

export const reactivity = (
  fn?: (props: IReactivityProps) => HTMLElement,
): Observable<HTMLElement> | null => {
  let observable$: Observable<HTMLElement> | null = null;

  if (!fn) {
    return null;
  }

  const stateManager = state((newValue: any) => {
    if (observable$) {
      observable$.emit(
        fn({
          state: () => stateManager(newValue),
          params,
          provide,
        }),
      );
    }
  });

  const element = fn({ state: stateManager, params, provide });

  observable$ = from(element);

  return observable$;
};
