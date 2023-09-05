import { IRoute, TRoutingOptions } from 'interfaces/routes';
import { component } from '../core/component';
import provide from '../core/provider';
import { RoutingToken } from './routing-token';
import { ifMatches } from './utils/matches';
import { validateRoute } from './utils/validate-route';

export const routing = async (
  name: string,
  routes: IRoute[],
  options?: Partial<TRoutingOptions>,
): Promise<HTMLElement> => {
  const element = component('::routing');
  const token = provide(RoutingToken);

  element.setAttribute('data-name', name);

  token.routingTree.set(name, element);

  const onRouteChange = async () => {
    const hash = location.pathname.replace('/', '').split('/').filter(Boolean);

    const matches = routes.find(({ path, loadChild, children }) => {
      const pathSplitted = path.split('/');

      token.pathTree.set(path, name);

      if (hash.length === 0 && path === '') {
        return true;
      }

      return validateRoute(pathSplitted, hash, !!loadChild || !!children);
    });

    await ifMatches(matches!, element, hash, routes, options);
  };

  if (options?.isChildren) {
    await onRouteChange();
  }

  const onEvent = () => onRouteChange();

  window.addEventListener('popstate', onEvent);

  element.addEventListener('routeChanged', onEvent);

  window.addEventListener('DOMContentLoaded', onEvent);

  return element;
};
