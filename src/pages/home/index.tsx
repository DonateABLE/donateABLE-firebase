import Button from 'components/button'
import Content from 'components/content'
import SearchBar from 'components/search-bar'
import TextBox from 'components/textbox'
import Charity from 'orm/charity'
import CharityType from 'orm/charity-type'
import { Component, createElement, Fragment, ReactNode } from 'react'
import CharityBox from './charity'
import styles from './style.scss'

interface State {
    charities: Charity[]
    charityTypes: CharityType[]
}

export default class Home extends Component<{}, State> {
    private charityUnsubscribe?: () => void
    private charityTypeUnsubscribe?: () => void

    constructor(props: {}) {
        super(props)

        this.state = {
            charities: [],
            charityTypes: [],
        }
    }

    public componentDidMount(): void {
        this.charityUnsubscribe = Charity.builder()
            .orderBy('longName')
            .subscribe(c => this.setState({ charities: c }))
        this.charityTypeUnsubscribe = CharityType.builder()
            .orderBy('name')
            .subscribe(c => this.setState({ charityTypes: c }))
    }

    public componentWillUnmount(): void {
        this.charityUnsubscribe?.()
        this.charityTypeUnsubscribe?.()
    }

    public render(): ReactNode {
        return <Fragment>
            <div className={styles.top}>
                <h2 className={styles.heading}>
                    <span className={styles.light}>Support local charities in Guelph</span> <br />
                    without opening your wallet
                </h2>
                <div className={styles.buttonGroup}>
                    <TextBox className={styles.groupElement}>
                        Currently Donating <b className={styles.value}>14</b>
                    </TextBox>
                    <TextBox className={styles.groupElement}>
                        Donations to Date<b className={styles.value}>345</b>
                    </TextBox>
                    <TextBox className={styles.groupElement}>
                        Total Hashes <b className={styles.value}>{(13256475).toLocaleString()}</b>
                    </TextBox>
                    <Button className={styles.groupElement} color='white'>Login</Button>
                    <Button className={styles.groupElement} color='dark'>Sign Up</Button>
                </div>
            </div>
            <SearchBar />
            <Content>
                <h2 className={styles.heading}>
                    <span className={styles.light}>The Newest &amp; Easiest Way to Donate</span> <br />
                    Everyone can contribute
                </h2>
                <div className={styles.charities}>
                    {this.state.charities.map((c, i) => (
                        <CharityBox
                            key={c.longName + i}
                            charity={c}
                            charityTypes={this.state.charityTypes}
                        />
                    ))}
                </div>
            </Content>
        </Fragment>
    }
}
