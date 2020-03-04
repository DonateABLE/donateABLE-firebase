import Icon from 'components/icon'
import { useUser } from 'orm/user'
import { Component, createElement, Fragment, FunctionComponent, ReactNode, RefObject } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'utils'
import noUser from '../../assets/user.svg'
import styles from './style.scss'

interface Props {
    open: boolean
    onMenuOpenClick: () => void
    onMenuCloseClick: () => void
    options: Array<{ href: string, title: string }>
    rootRef: RefObject<HTMLElement>
}

const Menu: FunctionComponent<Props> = props => {
    const user = useUser()

    return <nav
        className={classNames(styles.menu, {
            [styles.open]: props.open,
        })}
        ref={props.rootRef}
    >
        <button
            className={styles.btnOpen}
            onClick={props.onMenuOpenClick}
        >
            <Icon name='bars' className={styles.burger} />
        </button>
        <button
            className={styles.btnClose}
            onClick={props.onMenuCloseClick}
        >
            <Icon name='times' />
        </button>
        {user === undefined
            ? (
                <Link
                    to='/'
                    onClick={props.onMenuCloseClick}
                >
                    <img
                        className={styles.logo}
                        src='https://donateable.ca/img/logo/D-Coloured-250x250.png'
                        alt='logo'
                    />
                </Link>
            )
            : (
                <Link
                    to='/user'
                    onClick={props.onMenuCloseClick}
                    className={styles.userLink}
                >
                    <img
                        className={styles.portrait}
                        src={user.portrait ?? noUser}
                        alt='user portrait'
                    />
                    <h3 className={styles.userName}>{user.fullName}</h3>
                </Link>
            )}
        <ul>
            {props.options.map(option => (
                <li key={option.href}>
                    <Link
                        to={option.href}
                        className={styles.link}
                        onClick={props.onMenuCloseClick}
                    >
                        {option.title}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>

}
export default Menu
