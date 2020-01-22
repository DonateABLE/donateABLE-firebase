import { createElement, FunctionComponent } from 'react'
import { classNames } from 'utils'
import styles from './style.scss'

interface Props {
    className?: string
    color?: 'light' | 'dark' | 'white'
    size?: 'small' | 'medium' | 'large'
}

const Button: FunctionComponent<Props> = ({ color = 'light', size = 'small', className, children }) => (
    <button
        className={classNames(styles.button, styles[color], styles[size], className)}
    >
        {children}
    </button>
)

export default Button
