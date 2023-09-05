import provide from 'packages/core/provider';
import { RoutingToken } from '../routing-token';

export const validateRoute = (
  routeSegments: string[],
  entry: string[],
  hasChild = false,
) => {
  const token = provide(RoutingToken);

  if (hasChild) {
    if (routeSegments.length > entry.length) {
      return false;
    }

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSegment = routeSegments[i];
      const entrySegment = entry[i];

      if (routeSegment.startsWith(':')) {
        token.current = {
          hash: routeSegments,
          variables: entry,
        };
        continue;
      }

      if (routeSegment !== entrySegment) {
        return false;
      }
    }
  } else {
    if (routeSegments.length !== entry.length) {
      return false;
    }

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSegment = routeSegments[i];
      const entrySegment = entry[i];

      if (routeSegment.startsWith(':')) {
        token.current = {
          hash: routeSegments,
          variables: entry,
        };

        continue;
      }

      if (routeSegment !== entrySegment) {
        return false;
      }
    }
  }

  return true;
};
