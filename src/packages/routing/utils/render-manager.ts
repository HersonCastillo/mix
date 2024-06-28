import { LazyModule, Route } from '../../../interfaces';
import { Observable } from '../../context/observable';
import { render } from '../../core/render';

export const clearElement = (element: HTMLElement) => {
  Array.from(element.children).forEach((node) => node.remove());
};

export const renderComponent = async (
  component: LazyModule<Observable<HTMLElement> | HTMLElement>,
  element: HTMLElement,
) => {
  const content = (await component).default();

  if (!content) {
    return;
  }

  clearElement(element);

  if (content instanceof Observable) {
    render(content, element);
  } else {
    element.appendChild(content);
  }
};

export const handleRenderization = async (
  { component, loadChild, children, ...rest }: Route,
  hash: string[],
  element: HTMLElement,
) => {
  if (children && children.length) {
    const child = children.find((current) => hash.includes(current.path));

    await renderComponent(child?.component as never, element);
  }

  if (loadChild) {
    const routes = (await loadChild).default;

    await handleRenderization(
      { ...rest, component: undefined, loadChild: undefined, children: routes },
      hash,
      element,
    );
  }

  if (component) {
    await renderComponent(component as never, element);
  }
};
