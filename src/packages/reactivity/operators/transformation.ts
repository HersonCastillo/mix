export const map = <T, K>(transformFn: (value: T) => K) => transformFn;

export const tap =
  <T>(tappingFn: (value: T) => void) =>
  (value: T) => {
    tappingFn(value);
    return value;
  };
