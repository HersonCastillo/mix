import { ILazyModule } from './lazy-module';

export interface IRoute {
  path: string;
  component?: ILazyModule<unknown> | null;
  canActivate?: (route: IRoute) => boolean;
  loadChild?: ILazyModule<unknown, IRoute[]>;
  children?: IRoute[];
}

export type TRoutingOptions = {
  isChildren: boolean;
  onUpdate: (route: IRoute | null) => void;
};
