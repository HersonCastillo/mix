export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).slice(2, 10);
  return timestamp.concat(randomStr);
};

export const attachElementId = (
  element: HTMLElement,
  propName = 'elementId',
  value = generateUniqueId(),
): HTMLElement => {
  Object.defineProperty(element, propName, { value });

  return element;
};

export const getElementId = (
  element: HTMLElement,
  propName = 'elementId',
): string => {
  return Object.getOwnPropertyDescriptor(element, propName)?.value ?? null;
};
