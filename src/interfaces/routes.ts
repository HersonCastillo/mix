import { LazyModule } from './lazy-module';

export interface Route {
  path: string;
  component?: LazyModule<unknown> | null;
  canActivate?: (route: Route) => boolean;
  loadChild?: LazyModule<unknown, Route[]>;
  children?: Route[];
}

export type RoutingOptions = {
  isChildren: boolean;
  onUpdate: (route: Route | null) => void;
};
