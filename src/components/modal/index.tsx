import Icon from 'components/icon'
import {
    Component,
    createElement,
    Fragment,
    FunctionComponent,
    MouseEvent as ReactMouseEvent,
    ReactElement,
    ReactNode,
} from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { classNames } from 'utils'
import styles from './style.scss'

export const Modal: FunctionComponent<{ onCloseClick: () => void, className?: string }> =
    ({ children, onCloseClick, className }) => (
        <div className={classNames(styles.modal, className)}>
            {children}
            <div className={styles.close} onClick={onCloseClick} >
                <Icon name='times' />
            </div>
        </div>
    )
export const ModalHeader: FunctionComponent = ({ children }) => <h2 className={styles.modalHeader}>{children}</h2>
export const ModalBody: FunctionComponent = ({ children }) => <div className={styles.modalBody}>{children}</div>

// staticModalController stores a reference to the modal controller that is
// currently being used
let staticModalController: ModalController | undefined

export interface ModalControl<T> {
    resolve: (value: T | PromiseLike<T>) => void
    close: () => void
}

/**
 * `openModal` opens a modal and returns a promise that is fulfilled when the
 * modal is closed.
 *
 * @param content a functional component that renders the content of the modal
 */
export function openModal(content: (ctl: ModalControl<void>) => ReactElement): Promise<void>
export function openModal<T>(content: (ctl: ModalControl<T>) => ReactElement, defaultValue: T): Promise<T>
export function openModal<T = void>(content: (ctl: ModalControl<T>) => ReactElement, defaultValue?: T): Promise<T> {
    return new Promise<T>(resolve => {
        let wrapper: HTMLDivElement | null = null
        let modal: ReactElement
        let unlisten: (() => void) | undefined

        /**
         * `close` will close the modal and return the value passed in
         *
         * @param value the value `openModal` will return
         */
        const close = (value: T | PromiseLike<T> | undefined) => {
            staticModalController?.removeModal(modal)
            resolve(value)
            unlisten?.()
        }

        // if the user navigates while a modal is open it will close and return
        // the default value
        unlisten = staticModalController?.props.history.listen(() => {
            close(defaultValue)
        })

        // if the user clicks the x in the modal it will close and return the
        // default value
        const modalClose = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === wrapper) {
                close(defaultValue)
            }
        }

        modal = <div ref={e => wrapper = e} className={styles.modalWrapper} onClick={modalClose}>
            {content({
                resolve: close,
                close: () => close(defaultValue),
            })}
        </div>

        staticModalController?.addModal(modal)
    })
}

/**
 * openInfoModal is a helper that opens a simple modal with a static title and
 * body
 *
 * @param title the title of the modal
 * @param body the text in the modal body
 */
export async function openInfoModal(title: ReactNode, body: ReactNode): Promise<void> {
    return openModal(ctx => <Modal onCloseClick={ctx.close}>
        <ModalHeader>
            {title}
        </ModalHeader>
        <ModalBody>
            {body}
        </ModalBody>
    </Modal>)
}

/**
 * `ModalController` manages all of the open modals
 */
export class ModalController extends Component<RouteComponentProps, { modals: ReactElement[] }> {

    constructor(props: RouteComponentProps) {
        super(props)

        this.state = {
            modals: [],
        }
    }
    public componentDidMount(): void {
        staticModalController = this
    }
    public render(): ReactNode {
        if (this.state.modals.length === 0) {
            document.body.style.overflow = 'auto'
        } else {
            document.body.style.overflow = 'hidden'
        }
        return this.state.modals.map((v, i) => <Fragment key={i}>{v}</Fragment>)
    }

    public addModal(modal: ReactElement): void {
        this.setState(pState => ({ modals: [...pState.modals, modal] }))
    }
    public removeModal(modal: ReactElement): void {
        this.setState(pState => ({ modals: pState.modals.filter(m => m !== modal) }))
    }
}
