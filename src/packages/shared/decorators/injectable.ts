import { ClassType } from 'interfaces/class-type';
import { createProvider } from 'packages/core/provider';

export const injectable = (Provider: ClassType) => createProvider(Provider);
