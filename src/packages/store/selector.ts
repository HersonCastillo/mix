// import isEqual from 'lodash.isequal';
// import { IStoreData, MandatorySelectorFn, SelectorFn } from './store';

// export const createSelector = <T>(
//   selectorFn: SelectorFn<T>,
//   id: string,
// ): MandatorySelectorFn<T> => {
//   let initialValue: T | undefined = undefined;

//   return (observable$) => {
//     const setValue = (value: T) => {
//       initialValue = value;
//       observable$.emit(value);
//     };

//     const fn = (data: IStoreData) => {
//       const update = selectorFn(data);

//       if (initialValue === undefined) {
//         setValue(update);
//       } else if (!isEqual(initialValue, update)) {
//         setValue(update);
//       }

//       return update;
//     };

//     return {
//       id,
//       selectorFn: fn,
//     };
//   };
// };
