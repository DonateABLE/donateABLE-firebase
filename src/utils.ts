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
export function addValue(cb: (value: string, e: SyntheticEvent) => void): (e: SyntheticEvent) => void {
    let ret = valueCache.get(cb)
    if (ret === undefined) {
        ret = e => {
            if (e.target instanceof HTMLInputElement
                || e.target instanceof HTMLSelectElement
                || e.target instanceof HTMLTextAreaElement
            ) {
                return cb(e.target.value, e)
            }
            return cb('', e)
        }
        valueCache.set(cb, ret)
    }
    return ret
}
