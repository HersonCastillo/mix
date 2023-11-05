import { ComponentProps } from '../../interfaces';
import { component, fragment } from '../core/component';

export const jsx = (tag: string, props: ComponentProps) => {
  if (tag === '::fragment') {
    const current = props.children as HTMLElement | HTMLElement[];

    return Array.isArray(current) ? fragment(...current) : fragment(current);
  }

  return component(tag, props);
};

export const jsxs = jsx;

export const Fragment = '::fragment';
