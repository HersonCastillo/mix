import { ILazyModule } from 'interfaces/lazy-module';
import { IRoute, TRoutingOptions } from 'interfaces/routes';
import provide from '../core/provider';
import { routing } from './routing';
import { RoutingToken } from './routing-token';

export const routingChild = async (
  name: string,
  childs: ILazyModule<unknown, IRoute[]>,
  options?: Partial<TRoutingOptions>,
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
