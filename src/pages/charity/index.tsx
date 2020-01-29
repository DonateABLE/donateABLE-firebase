import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import { openInfoModal } from 'components/modal'
import { charities } from 'data'
import { bind } from 'decko'
import { Component, createElement, Fragment, ReactNode } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
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
            <Button onClick={this.openHelpModal}>?</Button>
        </Content>
    }

    @bind
    private openHelpModal(): void {
        openInfoModal(
            'Donation Request Not Starting',
            <Fragment>
                Be sure to check that donateABLE is whitelisted on any
                adblockers and that your antivirus programs are not blocking our
                page. To learn hot to do this please visit our
                <Link to='/faq'>Frequently Asked Questions</Link> page.
                <Button>Continue</Button>
            </Fragment>,
        )
    }
}
