
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
