import {
    Component,
    createElement,
    Fragment,
    FunctionComponent,
    MouseEvent as ReactMouseEvent,
    ReactElement,
    ReactNode,
} from 'react'
import { findDOMNode, render } from 'react-dom'
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom'
import styles from './style.scss'

export const Modal: FunctionComponent = ({ children }) => <div className={styles.modal}>{children}</div>
export const ModalHeader: FunctionComponent = ({ children }) => <h2 className={styles.modalHeader}>{children}</h2>
export const ModalBody: FunctionComponent = ({ children }) => <p className={styles.modalBody}>{children}</p>

let staticModalController: ModalController | undefined

export interface ModalControl<T> {
    resolve: (value: T | PromiseLike<T>) => void
}

export function openModal<T = void>(content: (ctl: ModalControl<T>) => ReactElement, defaultValue?: T): Promise<T> {
    return new Promise<T>(resolve => {
        let wrapper: HTMLDivElement | null = null
        let modal: ReactElement
        let unlisten: (() => void) | undefined
        const close = (value: T | PromiseLike<T> | undefined) => {
            staticModalController?.removeModal(modal)
            resolve(value)
            unlisten?.()
        }
        unlisten = staticModalController?.props.history.listen(() => {
            close(defaultValue)
        })
        const modalClose = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.target === wrapper) {
                close(defaultValue)
            }
        }
        modal = <div ref={e => wrapper = e} className={styles.modalWrapper} onClick={modalClose}>
            {content({ resolve: close })}
        </div>

        staticModalController?.addModal(modal)
    })
}

export async function openInfoModal(title: ReactNode, body: ReactNode): Promise<void> {
    return openModal(ctx => <Modal>
        <ModalHeader>
            {title}
        </ModalHeader>
        <ModalBody>
            {body}
        </ModalBody>
    </Modal>)
}

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
        return this.state.modals.map((v, i) => <Fragment key={i}>{v}</Fragment>)
    }

    public addModal(modal: ReactElement): void {
        this.setState(pState => ({ modals: [...pState.modals, modal] }))
    }
    public removeModal(modal: ReactElement): void {
        this.setState(pState => ({ modals: pState.modals.filter(m => m !== modal) }))
    }
}
