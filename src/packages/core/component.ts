import { IComponentProps, IElementProps } from 'interfaces/component';
import { Observable } from '../reactivity/observable';
import { attachElementId } from '../shared/unique-id';
import { render } from './render';

export const fragment = (...children: HTMLElement[]) => {
  const base = document.createDocumentFragment();

  for (const child of children) {
    if (child instanceof Node) {
      base.appendChild(child);
    }
  }

  return base;
};

const onObservableChildren = (
  observable$: Observable<HTMLElement>,
  element: HTMLElement,
) => {
  render(observable$, element);
};

export const component = (
  tag:
    | string
    | HTMLElement
    | ((props?: IComponentProps | IElementProps) => HTMLElement),
  props?: IComponentProps | IElementProps,
) => {
  if (typeof tag === 'function') {
    return tag(props);
  }

  const element =
    typeof tag === 'string'
      ? attachElementId(document.createElement(tag))
      : tag;

  if (!props) {
    return element;
  }

  const { children, ref, className, style, ...rest } = props;

  if (typeof ref === 'object') {
    ref.current = element;
    ref.effect?.(element);
  }

  if (typeof style === 'object') {
    Object.assign(element.style, style);
  }

  if (className) {
    if (element.classList.length > 0) {
      element.classList.value = '';
    }

    Array.isArray(className)
      ? element.classList.add(...className)
      : element.classList.add(className);
  }

  if (rest) {
    for (const [key, value] of Object.entries(rest)) {
      element.setAttribute(key, String(value));
    }
  }

  if (!children) {
    return element;
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      if (typeof child === 'object') {
        if (child instanceof Observable) {
          onObservableChildren(child, element);
        } else {
          if (child instanceof Promise) {
            child.then((resolved) => element.appendChild(resolved));
          } else {
            element.appendChild(child!);
          }
        }
      } else if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      }
    }
  } else if (typeof children === 'object') {
    if (children instanceof Observable) {
      onObservableChildren(children, element);
    } else {
      if (children instanceof Promise) {
        children.then((resolved) => element.appendChild(resolved));
      } else {
        element.appendChild(children);
      }
    }
  } else {
    element.innerHTML = String(children);
  }

  return element;
};
