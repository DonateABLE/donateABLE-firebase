import AboutCharity from 'components/about-charity'
import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import DonationTargets from 'components/donation-targets'
import Icon from 'components/icon'
import { PageLoader } from 'components/loader'
import { openInfoModal } from 'components/modal'
import { Tab, TabContainer } from 'components/tabs'
import { bind } from 'decko'
import { __, La } from 'lang'
import Charity from 'orm/charity'
import { Component, createElement, Fragment, ReactNode } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import {
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share'
import Statistics from '../../components/charity-stats'
import styles from './style.scss'

type Props = RouteComponentProps<{ name: string }>

interface State {
    charity?: Charity
}

export default class CharityPage extends Component<Props, State> {
    private cancelCharity?: () => void

    constructor(props: Props) {
        super(props)

        this.state = {
            charity: undefined,
        }
    }

    public componentDidMount(): void {
        this.cancelCharity = Charity.builder()
            .where('longName', '==', this.props.match.params.name.replace(/_/g, ' '))
            .subscribe(c => this.setState({ charity: c[0] }))
    }

    public componentWillUnmount(): void {
        this.cancelCharity?.()
    }

    public render(): ReactNode {
        const charity = this.state.charity
        if (charity === undefined) {
            return <PageLoader />
        }
        return <Content>
            <FullWidth className={styles.header}>
                <img className={styles.logo} src={charity.logo} alt={`${charity.longName} logo`} />
                <div className={styles.info}>
                    <h2 className={styles.name}>{charity.longName}</h2>
                    <div className={styles.tagLine}>{charity.tagline}</div>
                    <div>Registered Business Name {charity.registeredBusinessName}</div>
                    <div>Business Number {charity.businessNumber}</div>
                </div>
                <div>
                    <a href={charity.canadaHelpsUrl} target='_blank'>
                        <Button
                            className={styles.makeDonation}
                            color='dark'
                            size='medium'
                        >
                            {__('charity.make-donation')} <Icon name='external-link-alt' />
                        </Button>
                    </a>
                </div>
            </FullWidth>
            <FullWidth className={styles.social} >
                <FacebookShareButton
                    quote={__('charity.social.facebook.quote')}
                    url={__('charity.social.facebook.url')}
                    hashtag={__('charity.social.facebook.hashtag')}
                    className={styles.link}
                >
                    <Icon className={styles.icon} name='facebook-f' />
                    <span className={styles.title}>
                        {__('charity.social.facebook.title')}
                    </span>
                </FacebookShareButton>
                <TwitterShareButton
                    title='Donate to Stuff'
                    url={location.href}
                    hashtags={['DonateABLE']}
                    className={styles.link}
                >
                    <Icon className={styles.icon} name='twitter' />
                    <span className={styles.title}>
                        {__('charity.social.twitter.title')}
                    </span>
                </TwitterShareButton>
                <a href={charity.websiteUrl} target='_blank' className={styles.link}>
                    <Icon className={styles.icon} name='globe' />
                    <span className={styles.title}>
                        {__('charity.social.website.title')}
                    </span>
                </a>
            </FullWidth>
            <div className={styles.makeDonationLower}>
                <a href={charity.canadaHelpsUrl} target='_blank'>
                    <Button
                        className={styles.button}
                        color='dark'
                        size='medium'
                    >
                        {__('charity.make-donation')} <Icon name='external-link-alt' />
                    </Button>
                </a>
            </div>

            <TabContainer>
                <Tab title={__('charity.statistics')}>
                    <Statistics charity={charity} />
                </Tab>
                <Tab title={__('charity.donation-targets')}>
                    <DonationTargets charity={charity} />
                </Tab>
                <Tab title={__('charity.about')}>
                    <AboutCharity charity={charity} />
                </Tab>
            </TabContainer>
            <Link to={`/charity/${this.state.charity?.id}/edit`}>Edit</Link>
        </Content >
    }

    @bind
    private openHelpModal(): void {
        openInfoModal(
            'Donation Request Not Starting?',
            <Fragment>
                <p>
                    Be sure to check that donateABLE is whitelisted on any
                    adblockers and that your antivirus programs are not blocking
                    our page. To learn hot to do this please visit
                    our <Link to='/faq'>Frequently Asked Questions</Link> page.
                </p>

                <Button fullWidth size='medium'>Continue</Button>
            </Fragment>,
        )
    }
}
