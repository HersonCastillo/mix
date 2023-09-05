type EAllowedNames = Array<string | Record<string, boolean | null | undefined>>;

export const classNames = (...names: EAllowedNames): string[] => {
  const attachments: (string | undefined)[] = [];

  for (const name of names) {
    if (!name) {
      continue;
    }

    if (typeof name === 'string') {
      attachments.push(name);
    } else if (typeof name === 'object') {
      attachments.push(
        ...Object.entries(name).map(([key, value]) =>
          value ? key : undefined,
        ),
      );
    }
  }

  return attachments
    .filter(Boolean)
    .map((values) => values?.replace(new RegExp(/[\s]{1,}/, 'g'), '-') ?? '');
};
