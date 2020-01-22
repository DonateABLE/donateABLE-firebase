import { createElement, FunctionComponent, ReactChild, ReactElement } from 'react'
import { render } from 'react-dom'
import styles from './style.scss'

export const Modal: FunctionComponent = ({ children }) => <div className={styles.modal}>{children}</div>
export const ModalHeader: FunctionComponent = ({ children }) => <h2 className={styles.modalHeader}>{children}</h2>
export const ModalBody: FunctionComponent = ({ children }) => <p className={styles.modalBody}>{children}</p>

export interface ModalControl<T> {
    resolve: (value: T | PromiseLike<T>) => void
}

export function openModal<T = void>(content: (ctl: ModalControl<T>) => ReactElement, defaultValue?: T): Promise<T> {
    return new Promise<T>(resolve => {
        const wrapper = document.createElement('div')
        const close = (value: T | PromiseLike<T> | undefined) => {
            document.body.removeChild(wrapper)
            resolve(value)
        }
        const modalClose = (e: MouseEvent) => {
            if (e.target === wrapper) {
                close(defaultValue)
            }
        }

        wrapper.addEventListener('click', modalClose)
        wrapper.classList.add(styles.modalWrapper)

        document.body.appendChild(wrapper)
        render(content({ resolve: close }), wrapper)
    })
}

export async function openInfoModal(title: ReactChild, body: ReactChild): Promise<void> {
    return openModal(() => <Modal>
        <ModalHeader>
            {title}
        </ModalHeader>
        <ModalBody>
            {body}
        </ModalBody>
    </Modal>)
}
