import { createElement, FunctionComponent } from 'react'
import { classNames } from 'utils'
import styles from './style.scss'

interface Props {
    className?: string
    color?: 'light' | 'dark' | 'white'
    size?: 'small' | 'medium' | 'large'
}

const TextBox: FunctionComponent<Props> = ({ color = 'light', size = 'small', className, children }) => (
    <div
        className={classNames(styles.textBox, styles[color], styles[size], className)}
    >
        {children}
    </div>
)

export default TextBox
