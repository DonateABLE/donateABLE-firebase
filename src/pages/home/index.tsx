import Button from 'components/button'
import Content from 'components/content'
import Layout from 'components/layout'
import SearchBar from 'components/search-bar'
import Charity from 'orm/charity'
import { Component, createElement, Fragment, ReactNode } from 'react'
import CharityBox from './charity'
import styles from './style.scss'

interface State {
    charities: Charity[]
}

export default class Home extends Component<{}, State> {
    private charityUnsubscribe?: () => void

    constructor(props: {}) {
        super(props)

        this.state = {
            charities: [],
        }
    }

    public componentDidMount(): void {
        this.charityUnsubscribe = Charity.builder().subscribe(c => this.setState({ charities: c }))
    }

    public componentWillUnmount(): void {
        this.charityUnsubscribe?.()
    }

    public render(): ReactNode {
        return <Fragment>
            <div className={styles.top}>
                <h2 className={styles.heading}>
                    <span className={styles.light}>Support local charities in Guelph</span> <br />
                    without opening your wallet
                </h2>
                <div className={styles.buttons}>
                    <Button>Currently Donating: <b>14</b></Button>
                    <Button>Donations to Date <b>345</b></Button>
                    <Button>Total Hashes <b>{(13256475).toLocaleString()}</b></Button>
                    <Button color='white'>Login</Button>
                    <Button color='dark'>Sign Up</Button>
                </div>
            </div>
            <SearchBar />
            <Content>
                <h2 className={styles.heading}>
                    <span className={styles.light}>The Newest &amp; Easiest Way to Donate</span> <br />
                    Everyone can contribute
                </h2>
                <div className={styles.charities}>
                    {this.state.charities.map((c, i) => <CharityBox key={c.shortName + i} charity={c} />)}
                </div>
            </Content>
        </Fragment>
    }
}
