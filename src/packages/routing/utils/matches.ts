import { Route, RoutingOptions } from '../../../interfaces';
import { clearElement, handleRenderization } from './render-manager';

export const ifMatches = async (
  matches: Route | null,
  element: HTMLElement,
  hash: string[],
  routes: Route[],
  options?: Partial<RoutingOptions>,
) => {
  if (!matches) {
    const notFoundMatcher = routes.find(({ path }) => path.at(0) === '*');

    if (notFoundMatcher) {
      await handleRenderization(notFoundMatcher, hash, element);
      options?.onUpdate?.(notFoundMatcher);
    } else {
      clearElement(element);
      options?.onUpdate?.(null);
    }

    return;
  }

  if (
    !matches.component &&
    matches.children?.length === 0 &&
    !matches.loadChild
  ) {
    // ? For those routes that didn't want to re-render the routing tag.
    return;
  }

  // ! In case canActivate function exists
  if (matches.canActivate) {
    if (matches.canActivate(matches)) {
      await handleRenderization(matches, hash, element);
      options?.onUpdate?.(matches);
    }

    return;
  }

  // ? For those routes that not contains a canActivate function
  await handleRenderization(matches, hash, element);
  options?.onUpdate?.(matches);
};
