import { ModalController } from 'components/modal'
import { SnackBar } from 'components/snack-bar'
import { bind } from 'decko'
import About from 'pages/about'
import Charity from 'pages/charity'
import CharityEdit from 'pages/charity-edit'
import Home from 'pages/home'
import { Component, createElement, createRef, ReactNode } from 'react'
import { findDOMNode } from 'react-dom'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom'
import { classNames, clickedOn } from 'utils'
import Menu from './menu'
import styles from './style.scss'
import UserEdit from 'pages/user'

interface State {
    menuOpen: boolean
}

export default class Layout extends Component<{}, State> {

    private menuRef = createRef<HTMLElement>()

    constructor(props: {}) {
        super(props)

        this.state = {
            menuOpen: false,
        }
    }

    public render(): ReactNode {
        return <Router>
            <div
                className={classNames(styles.layout, {
                    [styles.open]: this.state.menuOpen,
                })}
            >
                <Menu
                    open={this.state.menuOpen}
                    onMenuOpenClick={this.onMenuOpenClick}
                    onMenuCloseClick={this.onMenuCloseClick}
                    options={[
                        {
                            href: '/',
                            title: 'Home',
                        },
                        {
                            href: '/about',
                            title: 'About',
                        },
                        {
                            href: '/how_it_works',
                            title: 'How it Works',
                        },
                    ]}
                    rootRef={this.menuRef}
                />
                <header className={styles.header}>
                    <Link to='/'>
                        <img
                            src='https://donateable.ca/img/logo/donateABLE-long-colour-250.png'
                            alt='donateABLE logo'
                        />
                    </Link>
                </header>
                <div className={styles.content} >
                    <Switch>
                        <Route path='/about' component={About} />
                        <Route path='/user' component={UserEdit} />
                        <Route path='/charity/create' component={CharityEdit} />
                        <Route path='/charity/:id/edit' component={CharityEdit} />
                        <Route path='/charity/:name' component={Charity} />
                        <Route path='/' component={Home} />
                    </Switch>
                </div>
                <footer className={styles.footer}>
                    <span className={styles.poweredBy}>Powered By</span>
                    <img
                        className={styles.logo}
                        src='https://donateable.ca/img/logo/Synergenics-Logo-2008-White.png'
                        alt='Synergenics logo'
                    />
                </footer>
            </div>
            <Switch>
                <Route path='/' component={ModalController} />
            </Switch>
            <SnackBar />
        </Router>
    }

    @bind
    private onMenuOpenClick(): void {
        this.setState({ menuOpen: true })
        document.body.addEventListener('click', this.onBodyClick)
    }

    @bind
    private onMenuCloseClick(): void {
        this.setState({ menuOpen: false })
        document.body.removeEventListener('click', this.onBodyClick)
    }

    @bind
    private onBodyClick(e: MouseEvent): void {
        if (clickedOn(e, this.menuRef.current)) {
            return
        }
        this.setState({ menuOpen: false })
        document.body.removeEventListener('click', this.onBodyClick)
    }
}
