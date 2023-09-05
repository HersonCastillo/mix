import { ILazyModule } from 'interfaces/lazy-module';
import { IRoute } from 'interfaces/routes';
import { render } from '../../core/render';
import { Observable } from '../../reactivity/observable';

export const clearElement = (element: HTMLElement) => {
  Array.from(element.children).forEach((node) => node.remove());
};

export const renderComponent = async (
  component: ILazyModule<Observable<HTMLElement> | HTMLElement>,
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
  { component, loadChild, children, ...rest }: IRoute,
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
