import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import { charities } from 'data'
import { Component, createElement, ReactNode } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import styles from './style.scss'

export default class Charity extends Component<RouteComponentProps<{ name: string }>> {
    public render(): ReactNode {
        const charity = charities.find(c => c.name === this.props.match.params.name)
        if (charity === undefined) {
            return <Content>
                <h2>not found</h2>
            </Content>
        }
        return <Content>
            <FullWidth className={styles.header}>
                <img className={styles.logo} src={charity.logo} alt={`${charity.name} logo`} />
                <div className={styles.info}>
                    <h2 className={styles.name}>{charity.name}</h2>
                    <div className={styles.tagLine}>{charity.tagLine}</div>
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
