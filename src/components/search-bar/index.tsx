import Content, { FullWidth } from 'components/content'
import Icon from 'components/icon'
import { bind } from 'decko'
import CharityType from 'orm/charity-type'
import { Component, createElement, ReactNode } from 'react'
import { findDOMNode } from 'react-dom'
import { classNames, clickedOn } from 'utils'
import styles from './style.scss'

interface State {
    open: boolean
    charityTypes: CharityType[]
}

export default class SearchBar extends Component<{}, State> {
    private popup: HTMLElement | null = null
    private charityTypeCancel?: () => void

    constructor(props: {}) {
        super(props)
        this.state = {
            open: false,
            charityTypes: [],
        }
    }

    public componentDidMount(): void {
        this.charityTypeCancel = CharityType.builder()
            .subscribe(cts => this.setState({ charityTypes: cts }))
    }

    public componentWillUnmount(): void {
        this.charityTypeCancel?.()
    }

    public render(): ReactNode {
        return <div
            className={styles.searchBar}
            ref={e => this.popup = e}
        >
            <div className={styles.bar} onClick={this.onBarClick}>
                <Content noPadding>
                    <label className={styles.label} htmlFor='search' >
                        Search for charity
                        <Icon name='search' />
                    </label>
                </Content>
            </div>
            <FullWidth
                className={classNames(styles.popup, {
                    [styles.show]: this.state.open,
                })}
            >
                <h3 className={styles.label} >
                    <label htmlFor='search' >Search by charity name</label>
                </h3>
                <input className={styles.input} id='search' type='text' placeholder='Type Charity Name Here...' />
                <h3 className={styles.label} >Search by charity type</h3>
                <div className={styles.categories}>
                    {this.state.charityTypes.map(t => (
                        <div key={t.name} className={styles.category}>
                            <div className={styles.iconCircle}>
                                <Icon className={styles.icon} name={t.icon} />
                            </div>
                            <div className={styles.title}>{t.name} Charities</div>
                        </div>
                    ))}
                </div>
            </FullWidth>
        </div>
    }

    @bind
    private onBarClick(): void {
        this.setState({ open: true })
        document.body.addEventListener('click', this.onBodyClick)
    }

    @bind
    private onBodyClick(e: MouseEvent): void {
        if (clickedOn(e, this.popup)) {
            return
        }
        this.setState({ open: false })
        document.body.removeEventListener('click', this.onBodyClick)
    }
}
