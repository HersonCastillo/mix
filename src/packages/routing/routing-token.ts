import { injectable } from '../core/decorators';

@injectable
export class RoutingToken {
  routingTree: Map<string, HTMLElement> = new Map();
  pathTree: Map<string, string> = new Map();
  current: Record<string, string[]> = {
    hash: [],
    variables: [],
  };
}
