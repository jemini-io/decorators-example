import { als } from './app-context';

/**
 * However, deciding how to invoke a new context might take
 * some thought. If you're using express, just use a quick
 * piece of middleware. If you're using NestJS, a decorator
 * is probably better. This could be part of your AuthZ
 * Guard logic.
 */
export function EnableUserContext(
  _: object,
  key: string,
  descriptor: PropertyDescriptor,
): any {
  // console.log(args);
  const origFn = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const request = args[0];

    // mock authn/authz successfully gave us this.
    if (request.user) {
      return als.run(
        { userData: request.user },
        origFn.bind(this, ...args),
      );
    }
    return origFn.call(this, ...args);
  };
}
/** */

/**
 * Step 3
 * Writing a decorator to inject the data is fairly straightforward.
 */
export function WithUserData(
  _: object,
  key: string,
  descriptor: PropertyDescriptor,
) {
  const origFn = descriptor.value;
  descriptor.value = function (...args: any[]) {
    Reflect.defineProperty(
      this,
      'userData',
      // als.getStore()?.userData,
      {
        get() {
          return als.getStore()?.userData;
        },
      },
    );
    // this.set('userData', als.getStore()?.userData);
    // this.userData = als.getStore()?.userData;
    // this.
    return origFn.call(this, ...args);
  };
}
type t = PropertyDescriptor;
