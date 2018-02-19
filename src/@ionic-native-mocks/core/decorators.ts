/**
 * @private
 *
 * Set a temp property __key with initial value and overrides the getter & setter
 * defined by CordovaProperty
 */
export function MockCordovaProperty(initial: any) {
  function decorator(target: any, key: string) {
    target[`__${key}`] = initial;
    Object.defineProperty(target, key, {
      enumerable: true,
      get: () => {
        return target[`__${key}`];
      },
      set: (value) => {
        target[`__${key}`] = value;
      }
    });
  }

  return decorator;
}
