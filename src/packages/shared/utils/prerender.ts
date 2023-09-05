import { IComponentProps, IElementProps } from 'interfaces/component';
import { component, component as c } from 'packages/core';

const prerender =
  (tagName: TemplateStringsArray) =>
  (props?: IComponentProps | IElementProps) =>
    c(tagName.toString(), props);

export const div = prerender`div`;
export const p = prerender`p`;
export const anchor = prerender`a`;
export const input = prerender`input`;
export const select = prerender`select`;
export const option = prerender`option`;
export const form = prerender`form`;
export const main = prerender`main`;
export const section = prerender`section`;
export const img = prerender`img`;
export const table = prerender`table`;
export const tr = prerender`tr`;
export const td = prerender`td`;
export const th = prerender`th`;
export const br = prerender`br`;
export const hr = prerender`hr`;
export const button = prerender`button`;
export const span = prerender`span`;
export const label = prerender`label`;
export const template = prerender`template`;
export const nav = prerender`nav`;
export const li = prerender`li`;
export const ul = prerender`ul`;

export const empty = (): HTMLElement =>
  document.createTextNode('') as unknown as HTMLElement;

export const observe = (children: IComponentProps['children']) =>
  component('::obx', { children });

export const title = (
  level: 1 | 2 | 3 | 4 | 5 | 6,
  props?: IComponentProps | IElementProps,
) => c(`h${level}`, props);

export const icon = (
  name: string,
  isFill = false,
  props?: IComponentProps | IElementProps,
) => c('i', { className: `ri-${name}-${isFill ? 'fill' : 'line'}`, ...props });
