import { SyntheticEvent } from 'react'

export function notUndefined<T>(v: T | undefined): v is T {
    return v !== undefined
}
export function notNull<T>(v: T | null): v is T {
    return v !== null
}
export function classNames(
    ...classes: Array<{ [className: string]: boolean | null | undefined } | string | undefined | null>
): string {
    const classList = []

    for (const cls of classes.filter(notNull).filter(notUndefined)) {
        if (typeof cls === 'string') {
            classList.push(cls)
        } else if (typeof cls === 'object') {
            for (const [className, show] of Object.entries(cls)) {
                if (show) {
                    classList.push(className)
                }
            }
        }
    }

    return classList.join(' ')
}

export function clickedOn(e: MouseEvent, element: Element | Text | null): boolean {
    if (!(element instanceof HTMLElement)) {
        return false
    }

    const rect = element.getBoundingClientRect()

    return rect.top < e.y && rect.bottom > e.y && rect.left < e.x && rect.right > e.x
}

const valueCache = new WeakMap<(value: string, e: SyntheticEvent) => void, (e: SyntheticEvent) => void>()

/**
 * addValue allows you to write callbacks using the value of an input, select or
 * text area without needing to get an instance of the dom element.
 *
 * ```tsx
 * import {addValue} from 'utils'
 *
 * const click = (value: string, event: SyntheticEvent) => {
 *     // do something with value
 * })
 * <input onClick={addValue(click)} >
 * ```
 *
 * @param cb
 */
export function addValue(cb: (value: string, e: SyntheticEvent) => void): (e: SyntheticEvent) => void {
    let ret = valueCache.get(cb)
    if (ret === undefined) {
        ret = e => {
            if (e.currentTarget instanceof HTMLInputElement
                || e.currentTarget instanceof HTMLSelectElement
                || e.currentTarget instanceof HTMLTextAreaElement
            ) {
                return cb(e.currentTarget.value, e)
            }
            return cb('', e)
        }
        valueCache.set(cb, ret)
    }
    return ret
}

const argsCache = new WeakMap<object, Map<string, (...args: any) => void>>()

/**
 * The `bindArgs` function takes in some arguments then a function and will
 * return a function with the first arguments bound to the ones passed in.
 *
 * If you call bindArgs more than once with the same arguments it will return
 * the same instance of a function.
 *
 * ```ts
 * const foo = (a: string, b: number) => a + ' ' + b
 *
 * const bar1 = bindArgs('baz', foo)
 * // bar1 = (b: number) => 'baz' + ' ' + b
 *
 * const bar2 = bindArgs('baz', foo)
 * // bar1 and bar2 are the same instance of a function
 * bar1 === bar2
 * ```
 *
 * Typescript won't let you have spread types first but if it did this is would
 * be the type
 * ```ts
 *  function bindArgs<AX extends Array<string | number>, U extends unknown[]>(
 *     ...args: AX,
 *     callback: (...args: AX, ...originalArgs: U) => void,
 * ): (...originalArgs: U) => void
 * ```
 *
 * @param args
 * @param callback
 */
// tslint:disable: max-line-length
export function bindArgs<A0 extends number | string, U extends unknown[]>(arg0: A0, callback: (arg0: A0, ...originalArgs: U) => void): (...originalArgs: U) => void
export function bindArgs<A0 extends number | string, A1 extends number | string, U extends unknown[]>(arg0: A0, arg1: A1, callback: (arg0: A0, arg1: A1, ...originalArgs: U) => void): (...originalArgs: U) => void
export function bindArgs<A0 extends number | string, A1 extends number | string, A2 extends number | string, U extends unknown[]>(arg0: A0, arg1: A1, arg2: A2, callback: (arg0: A0, arg1: A1, arg2: A2, ...originalArgs: U) => void): (...originalArgs: U) => void
export function bindArgs<A0 extends number | string, A1 extends number | string, A2 extends number | string, A3 extends number | string, U extends unknown[]>(arg0: A0, arg1: A1, arg2: A2, arg3: A3, callback: (arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...originalArgs: U) => void): (...originalArgs: U) => void
export function bindArgs<A0 extends number | string, A1 extends number | string, A2 extends number | string, A3 extends number | string, A4 extends number | string, U extends unknown[]>(arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, ...originalArgs: U) => void): (...originalArgs: U) => void
export function bindArgs<A0 extends number | string, A1 extends number | string, A2 extends number | string, A3 extends number | string, A4 extends number | string, A5 extends number | string, U extends unknown[]>(arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, ...originalArgs: U) => void): (...originalArgs: U) => void
export function bindArgs<A0 extends number | string, A1 extends number | string, A2 extends number | string, A3 extends number | string, A4 extends number | string, A5 extends number | string, A6 extends number | string, U extends unknown[]>(arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, arg6: A6, callback: (arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, arg6: A6, ...originalArgs: U) => void): (...originalArgs: U) => void
export function bindArgs<A0 extends number | string, A1 extends number | string, A2 extends number | string, A3 extends number | string, A4 extends number | string, A5 extends number | string, A6 extends number | string, A7 extends number | string, U extends unknown[]>(arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, arg6: A6, arg7: A7, callback: (arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, arg6: A6, arg7: A7, ...originalArgs: U) => void): (...originalArgs: U) => void
export function bindArgs<A0 extends number | string, A1 extends number | string, A2 extends number | string, A3 extends number | string, A4 extends number | string, A5 extends number | string, A6 extends number | string, A7 extends number | string, A8 extends number | string, U extends unknown[]>(arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, arg6: A6, arg7: A7, arg8: A8, callback: (arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, arg6: A6, arg7: A7, arg8: A8, ...originalArgs: U) => void): (...originalArgs: U) => void
// tslint:enable: max-line-length
export function bindArgs(...args: unknown[]): (...args: unknown[]) => void {
    // this function uses unknown types because typescript wont let me use
    // a spread argument first

    // remove the callback from the args
    const callback = args.pop()
    if (typeof callback !== 'function') {
        throw new Error('the last argument of addArgs must be a function')
    }

    // get the map of arguments that get used for the callback or create one
    let m = argsCache.get(callback)
    if (m === undefined) {
        m = new Map()
        argsCache.set(callback, m)
    }

    // check for an existing callback with the arguments applied or create it
    let ret = m.get(argsKey(args))
    if (ret === undefined) {
        ret = (...childArgs) => callback(...args, ...childArgs)
        m.set(argsKey(args), ret)
    }

    return ret
}

function argsKey(args: unknown[]): string {
    return JSON.stringify(args)
}

// I used the following function to generate the arguments overloads for bindArgs

// function overload(num: number): string {
//     const generics = range(num).map(i => `A${i} extends number | string`).join(', ')
//     const args = range(num).map(i => `arg${i}: A${i}`).join(', ')
//     return `export function bindArgs<${generics}, U extends unknown[]>(`
//         + `${args}, callback: (${args}, ...originalArgs: U) => void,`
//         + '): (...originalArgs: U) => void'
// }
// console.log(range(10, 1).map(overload).join('\n'))

export function range(count: number, start: number = 0): number[] {
    return (new Array(count)).fill(0).map((_, i) => i + start)
}
