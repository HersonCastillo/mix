import { Route, RoutingOptions, LazyModule } from '../../interfaces';
import provide from '../core/provider';
import { routing } from './routing';
import { RoutingToken } from './routing-token';

export const routingChild = async (
  name: string,
  childs: LazyModule<unknown, Route[]>,
  options?: Partial<RoutingOptions>,
) => {
  const routes = (await childs).default;
  const token = provide(RoutingToken);

  const element = await routing(
    name,
    routes.map(({ path, ...rest }) => ({ ...rest, path: `${name}/${path}` })),
    options,
  );

  token.routingTree.set(name, element);

  return element;
};
