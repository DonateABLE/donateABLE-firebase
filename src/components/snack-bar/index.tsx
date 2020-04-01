import Button from 'components/button'
import { bind } from 'decko'
import EventTarget from 'event-target-shim'
import { createElement, FunctionComponent, useCallback, useState } from 'react'
import { classNames, useEventListener } from 'utils'
import uuidV4 from 'uuid/v4'
import styles from './style.scss'

interface ToastAction {
    title: string
    effect: () => void,
}
interface ToastOptions {
    // The text and effect of a button on the toast
    action?: ToastAction

    // time to live, the length of time the toast will be shown on screen
    ttl: number

    // a new toast with the same key as an old toast will replace the old tost
    // on the screen
    key: string | symbol
}
/**
 * The ToastMessageEvent class is used to show new toasts when dispatched to
 * toastEvents
 */
class ToastMessageEvent extends Event {
    public readonly id: string
    public hidden: boolean = false

    private timeoutID?: ReturnType<typeof setTimeout>

    constructor(
        public message: string,
        public readonly action: ToastAction | undefined,
        public readonly ttl: number,
        public readonly key: string | symbol,
    ) {
        super('message')

        this.id = uuidV4()

        if (this.ttl > 0) {
            this.timeoutID = setTimeout(() => {
                this.dismiss()
            }, this.ttl)
        }
    }

    public dismiss = (): void => {
        toastEvents.dispatchEvent(new ToastDismissEvent(this.id, true))
        setTimeout(() => {
            toastEvents.dispatchEvent(new ToastDismissEvent(this.id, false))
        }, 200)
    }

    public resetTimer = (): void => {
        if (this.ttl > 0) {
            if (this.timeoutID) {
                clearTimeout(this.timeoutID)
            }
            this.timeoutID = setTimeout(() => this.dismiss(), this.ttl)
        }
    }
}

/**
 * The ToastDismissEvent class is used to hide and then delete the toasts. It
 * needs to hide fist so the toast has time to animate out.
 */
class ToastDismissEvent extends Event {
    constructor(
        public readonly id: string,
        public hide: boolean,
    ) {
        super('dismiss')
    }
}

// toastEvents is the EventTarget that sends the toasts to show to the snack bar
const toastEvents = new EventTarget<{ message: ToastMessageEvent, dismiss: ToastDismissEvent }, {}, 'strict'>()

/**
 * SnackBar shows all of the active toasts in the bottom left of the screen
 */
export const SnackBar: FunctionComponent = props => {
    const [toasts, changeToasts] = useState<ToastMessageEvent[]>([])

    // when a new toast comes in add it to the toasts list
    useEventListener(toastEvents, 'message', e => {
        const toast = toasts.find(t => t.key === e.key)
        if (toast) {
            toast.resetTimer()
            toast.message = e.message

            changeToasts([...toasts])
        } else {
            changeToasts(toasts.concat([e]))
        }
    }, [toasts, changeToasts])

    // when the toast should be dismissed it will first hide the toast so that
    // it can animate out, then it will fully remove it
    useEventListener(toastEvents, 'dismiss', e => {
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

/**
 * showToast will add a toast to each `SnackBar` that is being rendered with the
 * text `message`.
 *
 * @param message the text on the toast
 * @param options additional options for the toast
 */
export function showToast(message: string, options: Partial<ToastOptions> = {}): void {
    const { action, ttl = 3000, key = Symbol() } = options
    toastEvents.dispatchEvent(new ToastMessageEvent(message, action, ttl, key))
}
