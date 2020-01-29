import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import Charity from 'orm/charity'
import { Component, createElement, ReactNode } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import styles from './style.scss'

interface State {
    charity?: Charity
}

export default class CharityPage extends Component<RouteComponentProps<{ name: string }>, State> {
    private cancelCharity?: () => void

    public componentDidMount(): void {
        this.cancelCharity = Charity.builder()
            .where('shortName', '==', this.props.match.params.name)
            .subscribe(c => this.setState({ charity: c[0] }))
    }

    public componentWillUnmount(): void {
        this.cancelCharity?.()
    }

    public render(): ReactNode {
        const charity = this.state.charity
        if (charity === undefined) {
            return <Content>
                <h2>not found</h2>
            </Content>
        }
        return <Content>
            <FullWidth className={styles.header}>
                <img className={styles.logo} src={charity.logo} alt={`${charity.shortName} logo`} />
                <div className={styles.info}>
                    <h2 className={styles.name}>{charity.shortName}</h2>
                    <div className={styles.tagLine}>{charity.tagline}</div>
                    <div>Registered Business Name {charity.registeredBusinessName}</div>
                    <div>Business Number {charity.businessNumber}</div>
                </div>
                <div>
                    <Button
                        className={styles.makeDonation}
                        color='dark'
                        size='medium'
                    >
                        Make a Monetary Donation
                    </Button>
                </div>
            </FullWidth>
            <FullWidth className={styles.social}>
                facebook
            </FullWidth>
            test
        </Content>
    }
}
