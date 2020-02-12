import AboutCharity from 'components/about-charity'
import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import DonationTargets from 'components/donation-targets'
import Icon from 'components/icon'
import { PageLoader } from 'components/loader'
import { openInfoModal } from 'components/modal'
import { Tab, TabContainer } from 'components/tabs'
import { bind } from 'decko'
import Charity from 'orm/charity'
import { Component, createElement, Fragment, ReactNode } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
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
            .where('longName', '==', this.props.match.params.name)
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
                            Make a Monetary Donation <Icon name='external-link-alt' />
                        </Button>
                    </a>
                </div>
            </FullWidth>
            <FullWidth className={styles.social} >
                <div className={styles.link}>
                    <Icon className={styles.icon} brand name='facebook-f' />
                    <span className={styles.title}>Share on Facebook</span>
                </div>
                <div className={styles.link}>
                    <Icon className={styles.icon} brand name='twitter' />
                    <span className={styles.title}>Share on twitter</span>
                </div>
                <div className={styles.link}>
                    <Icon className={styles.icon} name='globe' />
                    <span className={styles.title}>Visit charity website</span>
                </div>
            </FullWidth>
            <TabContainer>
                <Tab title='Statistics'>
                    <Statistics charity={charity} />
                </Tab>
                <Tab title='Donation Targets'>
                    <DonationTargets charity={charity} />
                </Tab>
                <Tab title='About'>
                    <AboutCharity charity={charity} />
                </Tab>
            </TabContainer>
            <Link to={`/charity/${this.state.charity?.id}/edit`}>Edit</Link>
        </Content>
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
