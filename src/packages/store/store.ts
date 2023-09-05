// import { StoreActions } from 'services/store/actions';
// import { createReducers } from 'services/store/reducers';
// import { IAppState, initialState } from 'services/store/state';
// import { injectable } from 'packages/shared/decorators/injectable';
// import { Observable } from 'packages/reactivity/observable';
// import { from } from 'packages/reactivity/reactivity';

// export interface IStoreData extends IAppState {}

// export type ReducerFn<T = undefined> = (
//   state: IStoreData,
//   payload?: T,
// ) => IStoreData;

// export type SelectorFn<T> = (state: IStoreData) => T;
// export type MandatorySelectorFn<T> = (observable$: Observable<T>) => {
//   id: string;
//   selectorFn: SelectorFn<T>;
// };

// export class Store {
//   data: IStoreData = initialState;
//   selector$ = from(this.data);
//   active: Record<string, Observable<unknown>> = {};

//   select<T>(mandatorySelectorFn: MandatorySelectorFn<T>): Observable<T> {
//     const observable$ = new Observable<T>();
//     const { id, selectorFn } = mandatorySelectorFn(observable$);

//     if (this.active[id]) {
//       return this.active[id] as Observable<T>;
//     }

//     const onSuscription = (data: IStoreData) => selectorFn(data);
//     this.selector$.subscribe(onSuscription);

//     this.active[id] = observable$;

//     return observable$;
//   }
// }

// class Reducer extends Store {
//   private reducer: Record<StoreActions, ReducerFn> = createReducers();

//   reduce<T>(actionName: StoreActions, payload?: T): IStoreData {
//     const reducerFn = this.reducer[actionName] as ReducerFn<T>;
//     const data = reducerFn(this.data, payload);
//     this.data = data;

//     return data;
//   }
// }

// export class Actions extends Reducer {
//   dispatch<T>(actionName: StoreActions, payload?: T): void {
//     const data = this.reduce(actionName, payload);
//     this.selector$.emit(data);
//   }
// }

// @injectable
// export class VirtualStore extends Actions {}
