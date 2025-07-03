type UncurryThis<T extends (this: unknown, ...args: unknown[]) => unknown> =
  (self: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;
type UncurryThisStaticApply<T extends (this: unknown, ...args: unknown[]) => unknown> =
  (self: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;
type StaticApply<T extends (this: unknown, ...args: unknown[]) => unknown> =
  (args: Parameters<T>) => ReturnType<T>;

type UncurryMethod<O, k extends keyof O, T = O> =
  O[K] extends (this: infer U, ...args: infer A) => infer R
    ? (self: unknown extends U ? T : U, ...args: A) => R
    : never;
type UncurryMethodApply<O, K extends keyof O, T = O> =
  O[K] extends (this: infer U, ...args: infer A) => infer R
    ? (self: unknown extends U ? T : U, ...args: A) => R
    : never;

type UncurryGetter<O, K extends keyof O, T = O> =
  O[K] extends infer V ? (self: T) => V : never;
type UncurrySetter<O, K extends keyof O, T = O> =
  O[K] extends infer V ? (self: T, value: V) => void : never;

type TypedArrayContentType<T extends TypedArray> = T extends { [K: number]: infer V } ? V : never;

/**
 * Primordials are a way to safely use globals without fear of global mutation
 * Generally, this means removing `this` parameter usage and instead using
 * a regular parameter:
 *
 * @example
 *
 * ```js
 * 'thing'.startsWith('hello');
 * ```
 *
 * becomes
 *
 * ```js
 * primordials.StringPrototypeStartsWith('thing', 'hello')
 * ```
 */
declare namespace primordials {
  export function uncurryThis<T extends (...args: unknown[]) => unknown>(fn: T): UncurryThis<T>;
  export function makeSafe<T extends NewableFunction>(unsafe: NewableFunction, safe: T): T;

  export import decodeURI = globalThis.decodeURI;
  export import decodeURIComponent = globalThis.decodeURIComponent;
  export import encodeURI = globalThis.encodeURI;
  export import encodeURIComponent = globalThis.encodeURIComponent;
  export const AtomicsAdd: typeof Atomics.add
  export const AtomicsAnd: typeof Atomics.and
  export const AtomicsCompareExchange: typeof Atomics.compareExchange
  export const AtomicsExchange: typeof Atomics.exchange
  export const AtomicsIsLockFree: typeof Atomics.isLockFree
  export const AtomicsLoad: typeof Atomics.load
  export const AtomicsNotify: typeof Atomics.notify
  export const AtomicsOr: typeof Atomics.or
  export const AtomicsStore: typeof Atomics.store
  export const AtomicsSub: typeof Atomics.sub
  export const AtomicsWait: typeof Atomics.wait
  export const AtomicsWaitSync: typeof Atomics.waitAsync
  export const AtomicsXor: typeof Atomics.xor
  export const JSONParse: typeof JSON.parse
  export const JSONStringify: typeof JSON.stringify
  export const MathAbs: typeof Math.abs
  export const MathAcos: typeof Math.acos
  export const MathAcosh: typeof Math.acosh
  export const MathAsin: typeof Math.asin
  export const MathAsinh: typeof Math.asinh
  export const MathAtan: typeof Math.atan
  export const MathAtanh: typeof Math.atanh
  export const MathAtan2: typeof Math.atan2
  export const MathCeil: typeof Math.ceil
  export const MathCbrt: typeof Math.cbrt
  export const MathExpm1: typeof Math.expm1
  export const MathClz32: typeof Math.clz32
  export const MathCos: typeof Math.cos
  export const MathCosh: typeof Math.cosh
  export const MathExp: typeof Math.exp
  export const MathFloor: typeof Math.floor
  export const MathFround: typeof Math.fround
  export const MathHypot: typeof Math.hypot
  export const MathImul: typeof Math.imul
  export const MathLog: typeof Math.log
  export const MathLog1p: typeof Math.log1p
  export const MathLog2: typeof Math.log2
  export const MathLog10: typeof Math.log10
  export const MathMax: typeof Math.max
  export const MathMaxApply: StaticApply<typeof Math.max>
  export const MathMin: typeof Math.min
  export const MathPow: typeof Math.pow
}
