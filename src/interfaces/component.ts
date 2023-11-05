import { Observable } from '../packages/reactivity';

export type ComponentChildren = ChildrenTypes | ChildrenTypes[];

export type ChildrenTypes =
  | string
  | HTMLElement
  | boolean
  | Observable<HTMLElement>
  | null
  | undefined;

export interface ComponentProps {
  id?: string;
  className?: string | string[];
  children?: ComponentChildren;
  ref?: ComponentRef;
  style?: ElementCSSInlineStyle;
}

export interface ComponentRef<T = HTMLElement> {
  current: T | null;
  effect?: (element: HTMLElement) => void;
}

export interface ElementProps {
  [x: string]: string;
}
