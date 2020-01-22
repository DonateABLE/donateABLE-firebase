import { createElement, FunctionComponent } from 'react'
import { classNames } from 'utils'
import styles from './style.scss'

interface Props {
    className?: string
    color?: 'light' | 'dark' | 'white'
    size?: 'small' | 'medium' | 'large'
    onClick?: () => void
}

const Button: FunctionComponent<Props> = ({ color = 'light', size = 'small', className, onClick, children }) => (
    <button
        className={classNames(styles.button, styles[color], styles[size], className)}
        onClick={onClick}
    >
        {children}
    </button>
)

export default Button
