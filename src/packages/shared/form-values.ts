/**
 * @deprecated
 */
export const handleSubmit = (submitFn: (values: unknown) => void) => {
  return (event: Event) => {
    const target = event.target as HTMLInputElement;
    const elements: HTMLInputElement[] = Object.values({ ...target }).filter(
      (node: any) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(node.nodeName),
    ) as HTMLInputElement[];
    const values: Record<string, unknown> = {};
    for (const element of elements) {
      values[element.name] = element.value;
    }

    submitFn(values);

    event.preventDefault();
  };
};
