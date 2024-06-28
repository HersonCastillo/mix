import { Observable } from './observable';

export const fromEvent = <T extends HTMLElement>(
  element: T,
  eventName: keyof HTMLElementEventMap,
) => {
  const observable$ = new Observable<Event>();

  const onEvent = (event: Event) => {
    observable$.next(event);
  };

  element.addEventListener(eventName, onEvent);

  return observable$;
};

export const from = <T>(initialValue: T, emitInitialValue = true) => {
  const observable$ = new Observable<T>();

  if (emitInitialValue) {
    observable$.next(initialValue);
  }

  return observable$;
};

export const fromPromise = <T>(promise: Promise<T>): Observable<T> => {
  const observable$ = new Observable<T>();

  const resolver = async () => {
    try {
      const value = await promise;

      observable$.next(value);

      observable$.unsubscribeAll();
    } catch (ex) {
      throw new Error('Cannot transform the Promise into an Observable', {
        cause: ex,
      });
    }
  };

  resolver();

  return observable$;
};
