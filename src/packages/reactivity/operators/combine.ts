import { Observable } from '../../reactivity/observable';

export const combine = (
  ...observables$: Array<Observable<unknown>>
): Observable<Array<unknown>> => {
  const merge$ = new Observable<Array<unknown>>();
  const values: unknown[] = [];

  observables$.forEach((observable$, index) =>
    observable$.subscribe((data) => {
      values[index] = data;

      if (values.length === observables$.length) {
        merge$.emit(values);
      }
    }),
  );

  return merge$;
};
