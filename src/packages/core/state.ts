export const state = <T>(
  onUpdateTrigger?: (value: T) => void,
): ((initialValue: T) => [T, (value: T) => void]) => {
  let value: T | undefined = undefined;

  const updater = (newValue: T) => {
    value = newValue;
    onUpdateTrigger?.(newValue);
  };

  return (initialValue: T) => {
    value = initialValue;

    return [value, updater];
  };
};
