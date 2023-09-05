import { ClassType } from 'interfaces/class-type';
import { createProvider } from '../provider';

export const injectable = (Provider: ClassType) => createProvider(Provider);
