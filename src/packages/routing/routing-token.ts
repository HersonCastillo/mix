import { injectable } from 'packages/shared/decorators/injectable';

@injectable
export class RoutingToken {
  routingTree: Map<string, HTMLElement> = new Map();
  pathTree: Map<string, string> = new Map();
  current: Record<string, string[]> = {
    hash: [],
    variables: [],
  };
}
