import Button from 'components/button'
import { bind } from 'decko'
// import EventTarget from 'event-target-shim'
import { createElement, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { classNames, useEventListener, useInterval } from 'utils'
import uuidV4 from 'uuid/v4'
import styles from './style.scss'

interface ToastAction {
    title: string
    effect: () => void,
}

interface ToastOptions {
    action?: ToastAction
    ttl: number
    key: string | symbol
}

class ToastMessageEvent extends Event {
    public readonly id: string
    public hidden: boolean = false

    private timeoutID?: NodeJS.Timeout

    constructor(
        public message: string,
        public readonly action: ToastAction | undefined,
        public readonly ttl: number,
        public readonly key: string | symbol,
    ) {
        super('message')

        this.id = uuidV4()

        if (this.ttl > 0) {
            this.timeoutID = setTimeout(() => this.dismiss(), this.ttl)
        }
    }

    @bind
    public dismiss(): void {
        toastEvents.dispatchEvent(new ToastDismissEvent(this.id, true))
        setTimeout(() => {
            toastEvents.dispatchEvent(new ToastDismissEvent(this.id, false))
        }, 200)
    }

    public resetTimer(): void {
        if (this.ttl > 0) {
            if (this.timeoutID) {
                clearTimeout(this.timeoutID)
            }
            this.timeoutID = setTimeout(() => this.dismiss(), this.ttl)
        }
    }
}

class ToastDismissEvent extends Event {
    constructor(
        public readonly id: string,
        public hide: boolean,
    ) {
        super('dismiss')
    }
}

const toastEvents = new EventTarget()

export const SnackBar: FunctionComponent = props => {
    const [toasts, changeToasts] = useState<ToastMessageEvent[]>([])

    useEventListener(toastEvents, 'message', e => {
        if (e instanceof ToastMessageEvent) {
            const toast = toasts.find(t => t.key === e.key)
            if (toast) {
                toast.resetTimer()
                toast.message = e.message

                changeToasts([...toasts])
            } else {
                changeToasts(toasts.concat([e]))
            }
        }
    }, [toasts, changeToasts])

    useEventListener(toastEvents, 'dismiss', e => {
        if (e instanceof ToastDismissEvent) {
            if (e.hide) {
                changeToasts(toasts.map(t => {
                    if (t.id === e.id) {
                        t.hidden = true
                    }
                    return t
                }))
            } else {
                changeToasts(toasts.filter(t => t.id !== e.id))
            }
        }
    }, [toasts, changeToasts])

    return <div className={styles.snackBar}>
        {toasts.map(t => (
            <Toast key={t.id} event={t} />
        ))}
    </div>
}

const Toast: FunctionComponent<{ event: ToastMessageEvent }> = ({ event }) => {

    const clickAction = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        event.action?.effect()
    }, [event.action?.effect])

    return <div className={classNames(styles.toast, { [styles.hidden]: event.hidden })} onClick={event.dismiss}>
        {event.message}

        {/* {event.count > 1 &&
            ' ×' + event.count} */}

        {event.action &&
            <Button
                onClick={clickAction}
                className={styles.button}
                color='light'
                clear
            >
                {event.action.title}
            </Button>}
    </div>
}

export function showToast(message: string, options: Partial<ToastOptions> = {}): void {
    const { action, ttl = 3000, key = Symbol() } = options
    toastEvents.dispatchEvent(new ToastMessageEvent(message, action, ttl, key))
}
