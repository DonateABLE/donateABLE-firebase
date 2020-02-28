import Icon from 'components/icon'
import { Component, createElement, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'utils'
import styles from './style.scss'

interface Props {
    open: boolean
    onMenuOpenClick: () => void
    onMenuCloseClick: () => void
    options: Array<{ href: string, title: string }>
}

export default class Menu extends Component<Props> {

    public render(): ReactNode {
        return <nav
            className={classNames(styles.menu, {
                [styles.open]: this.props.open,
            })}
        >
            <button
                className={styles.btnOpen}
                onClick={this.props.onMenuOpenClick}
            >
                <Icon name='bars' className={styles.burger} />
            </button>
            <button
                className={styles.btnClose}
                onClick={this.props.onMenuCloseClick}
            >
                <Icon name='times' />
            </button>
            <Link
                to='/'
                onClick={this.props.onMenuCloseClick}
            >
                <img className={styles.logo} src='https://donateable.ca/img/logo/D-Coloured-250x250.png' alt='logo' />
            </Link>
            <ul>
                {this.props.options.map(option => (
                    <li key={option.href}>
                        <Link
                            to={option.href}
                            className={styles.link}
                            onClick={this.props.onMenuCloseClick}
                        >
                            {option.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    }
}
