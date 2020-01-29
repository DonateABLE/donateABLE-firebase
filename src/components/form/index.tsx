import { createElement, FunctionComponent, SyntheticEvent } from 'react'
import { classNames } from 'utils'
import styles from './style.scss'

export interface FormElementProps {
    title: string,
    icon?: string,
    iconBrand?: string,
    value: string,
    onChange: (e: SyntheticEvent<HTMLInputElement>) => void
    white?: boolean,
}

const Input: FunctionComponent<FormElementProps> = props => (
    <div className={classNames(styles.formElement, { [styles.white]: props.white })}>
        <label>
            <div className={styles.title}>
                {props.title}
            </div>
            <input
                className={styles.input}
                type='text'
                value={props.value}
                onChange={props.onChange}
            />
        </label>
    </div>
)

export default Input
