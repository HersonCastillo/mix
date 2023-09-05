import provide from 'packages/core/provider';
import { RoutingToken } from './routing-token';

type TLinkHistoryOptions = {
  triggerEvent: boolean;
  triggerScroll: boolean;
  scrollBehavior: ScrollBehavior;
  scrollTime: number;
};

const scrollOnTimeout = (ms: number, behavior: ScrollBehavior) => {
  setTimeout(() => window.scroll({ behavior, top: 0 }), ms);
};

export const linkTo = (
  path: string,
  options?: Partial<TLinkHistoryOptions>,
) => {
  const current = location.pathname;
  const token = provide(RoutingToken);

  if (current !== `/${path}`) {
    const routeChanged = new CustomEvent('routeChanged');
    history.pushState({}, '', path);

    if (options?.triggerEvent ?? true) {
      const pathname = path.replace('/', '');
      const routingName = token.pathTree.get(pathname);
      const element = token.routingTree.get(routingName!);

      if (!element) {
        const curr = document.querySelector('[data-name="app"]');

        curr?.dispatchEvent(routeChanged);

        if (options?.triggerScroll) {
          scrollOnTimeout(
            options?.scrollTime ?? 400,
            options?.scrollBehavior ?? 'smooth',
          );
        }

        return;
      }

      element.dispatchEvent(routeChanged);

      if (options?.triggerScroll) {
        scrollOnTimeout(
          options?.scrollTime ?? 400,
          options?.scrollBehavior ?? 'smooth',
        );
      }
    }
  }
};

export const params = () => {
  const { hash, variables } = provide(RoutingToken).current;

  const records: Record<string, string> = {};
  for (const name of hash) {
    if (!name.startsWith(':')) {
      continue;
    }

    const index = hash.indexOf(name);
    records[name.replace(':', '')] = variables[index];
  }

  return records;
};
