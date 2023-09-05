import { Observable } from '../packages/reactivity';

export type ComponentChildren = ChildrenTypes | ChildrenTypes[];

export type ChildrenTypes =
  | string
  | HTMLElement
  | boolean
  | Observable<HTMLElement>
  | null
  | undefined;

export interface IComponentProps {
  id?: string;
  className?: string | string[];
  children?: ComponentChildren;
  ref?: IComponentRef;
  style?: ElementCSSInlineStyle;
}

export interface IComponentRef<T = HTMLElement> {
  current: T | null;
  effect?: (element: HTMLElement) => void;
}

export interface IElementProps {
  [x: string]: string;
}
