declare namespace JSX {
  // ? Reference: src/core/component:IComponentProps

  export interface ComponentProps {
    id?: string;
    className?: string | string[];
    children?: unknown;
    ref?: unknown;
    style?: unknown;
  }

  // ? Reference: src/core/component:IElementProps

  export interface ElementProps {
    [x: string]: string;
  }

  interface IntrinsicElements {
    [key: string]: ComponentProps | ElementProps;
  }

  interface Element extends HTMLElement {}
}
