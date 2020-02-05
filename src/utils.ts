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
 * ```jsx
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

const argsCache = new WeakMap<(...args: any[]) => void, Map<string, (e: SyntheticEvent) => void>>()

/**
 * addArgs lets you use callbacks in react components that have extra arguments
 *
 * @param callback a
 */
export function addArgs<T1, T2, T3>(
    arg1: T1,
    arg2: T2,
    arg3: T3,
    callback: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        e: SyntheticEvent,
    ) => void,
): (e: SyntheticEvent) => void
export function addArgs<T1, T2>(
    arg1: T1,
    arg2: T2,
    callback: (
        arg1: T1,
        arg2: T2,
        e: SyntheticEvent,
    ) => void,
): (e: SyntheticEvent) => void
export function addArgs<T>(arg1: T, callback: (arg1: T, e: SyntheticEvent) => void): (e: SyntheticEvent) => void
export function addArgs<T>(
    ...args: Array<T | ((...args: Array<T | SyntheticEvent>) => void)>
): (e: SyntheticEvent) => void {

    // pop the callback from the arguments, this will remove it from the end
    const callback: any = args.pop()
    if (typeof callback !== 'function') {
        throw new Error('the last function must be a callback')
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
        ret = e => callback(...args, e)
        m.set(argsKey(args), ret)

    }

    return ret
}

function argsKey(args: unknown[]): string {
    return JSON.stringify(args)
}
