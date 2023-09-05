import { ClassType } from 'interfaces/class-type';

class Singleton {
  private providers: Map<string, unknown> = new Map();

  setProvider<T>(name: string, instance: T): T {
    this.providers.set(name, instance);
    return instance;
  }

  exists<T>(name: string): boolean {
    return this.providers.has(name);
  }

  getProvider<T>(Provider: ClassType<T>): T {
    if (!this.exists(Provider.name)) {
      throw new Error(`No provider for: ${Provider.name}`);
    }

    return this.providers.get(Provider.name) as T;
  }
}

const singleton = new Singleton();

const provide = <T>(Provider: ClassType<T>): T =>
  singleton.getProvider(Provider);

export default provide;

export const createProvider = <T>(Provider: ClassType<T>): void => {
  if (!singleton.exists(Provider.name)) {
    singleton.setProvider(Provider.name, new Provider());
  }
};
