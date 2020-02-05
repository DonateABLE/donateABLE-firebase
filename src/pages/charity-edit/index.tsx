import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import Input from 'components/form'
import Icon, { BrandIconName, SolidIconName } from 'components/icon'
import { openInfoModal } from 'components/modal'
import { Tab, TabContainer } from 'components/tabs'
import { bind, memoize } from 'decko'
import Charity from 'orm/charity'
import { storage } from 'orm/firebase'
import { Component, createElement, Fragment, FunctionComponent, ReactNode, SyntheticEvent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { addValue } from 'utils'
import uuidv4 from 'uuid/v4'
import styles from './style.scss'

type Props = RouteComponentProps<{ id?: string }>

interface State {
    charity: Charity
    logoURL?: string
}

export default class CharityEdit extends Component<Props, State> {
    private cancelCharity?: () => void

    constructor(props: Props) {
        super(props)

        this.state = {
            charity: new Charity(),
        }
    }

    public componentDidMount(): void {
        if (this.props.match.params.id) {

            this.cancelCharity = Charity.subscribe(
                this.props.match.params.id,
                async c => {
                    this.setState({
                        charity: c,
                        logoURL: c.logo,
                    })
                },
            )
        }
    }

    public componentWillUnmount(): void {
        this.cancelCharity?.()
    }

    public render(): ReactNode {
        const charity = this.state.charity

        return <Content>
            <FullWidth className={styles.header}>
                <label>
                    <img className={styles.logo} src={this.state.logoURL} alt={`${charity.longName} logo`} />
                    <input type='file' onChange={this.logoChange} />
                </label>
                <div className={styles.info}>
                    <Input
                        white
                        title='Charity Name'
                        value={charity.longName}
                        onChange={this.charityChangeString('longName')}
                    />
                    <Input
                        white
                        title='Tagline'
                        value={charity.tagline}
                        onChange={this.charityChangeString('tagline')}
                    />
                    <Input
                        white
                        title='Registered Business Name'
                        value={charity.registeredBusinessName}
                        onChange={this.charityChangeString('registeredBusinessName')}
                    />
                    <Input
                        white
                        title='Business Number'
                        value={charity.businessNumber}
                        onChange={this.charityChangeString('businessNumber')}
                    />
                </div>
            </FullWidth>
            <FullWidth className={styles.social}>
                <Input
                    white
                    iconBrand='facebook'
                    title='Facebook'
                    value={charity.facebookUrl}
                    onChange={this.charityChangeString('facebookUrl')}
                />
                <Input
                    white
                    iconBrand='twitter'
                    title='Twitter'
                    value={charity.twitterUrl}
                    onChange={this.charityChangeString('twitterUrl')}
                />
                <Input
                    white
                    title='Charity Website'
                    icon='globe'
                    value={charity.websiteUrl}
                    onChange={this.charityChangeString('websiteUrl')}
                />
                <Input
                    white
                    title='Canada Helps Link'
                    icon='money-bill'
                    value={charity.canadaHelpsUrl}
                    onChange={this.charityChangeString('canadaHelpsUrl')}
                />
            </FullWidth>
            <TabContainer>
                <Tab title='About Charity'>
                    <h3>About {charity.longName}</h3>
                    <textarea
                        className={styles.description}
                        value={charity.longDesc}
                        onChange={this.charityChangeString('longDesc')}
                    />
                    <h3>Contact {charity.longName}</h3>

                    <div className={styles.extraInfo}>
                        <Input
                            title='Street Address'
                            value={charity.address}
                            onChange={this.charityChangeString('address')}
                        />
                        <Input
                            title='City, Province'
                            value={charity.cityProvince}
                            onChange={this.charityChangeString('cityProvince')}
                        />
                        <Input
                            title='Postal Code'
                            value={charity.postalCode}
                            onChange={this.charityChangeString('postalCode')}
                        />
                        <Input
                            title='Phone'
                            value={charity.phone}
                            onChange={this.charityChangeString('phone')}
                        />
                        <Input
                            title='Fax'
                            value={charity.fax}
                            onChange={this.charityChangeString('fax')}
                        />
                        <Input
                            title='Email'
                            value={charity.email}
                            onChange={this.charityChangeString('email')}
                        />
                        <h4>Office Hours</h4>
                        <Input
                            title='Days'
                            value={charity.officeHourDays}
                            onChange={this.charityChangeString('officeHourDays')}
                        />
                        <Input
                            title='Hours'
                            value={charity.officeHourHours}
                            onChange={this.charityChangeString('officeHourHours')}
                        />
                    </div>
                </Tab>
                <Tab title='Donation Targets'>a</Tab>
            </TabContainer>

            <Button onClick={this.save}>Save</Button>
        </Content>
    }

    @memoize
    private charityChangeString(field: FilterPropertyNames<Charity, string>): (e: SyntheticEvent) => void {
        return addValue(value => {
            this.setState(state => {
                state.charity[field] = value as any
                return { charity: state.charity }
            })
        })
    }

    @memoize
    private charityChangeNumber(field: FilterPropertyNames<Charity, number>): (e: SyntheticEvent) => void {
        return addValue(value => {
            this.setState(state => {
                state.charity[field] = Number(value)
                return { charity: state.charity }
            })
        })
    }

    @bind
    private async save(): Promise<void> {
        await this.state.charity.save()
        if (this.props.match.params.id !== this.state.charity.id) {
            this.props.history.push(`/charity/${this.state.charity.id}/edit`)
        }
    }

    @bind
    private async logoChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = e.currentTarget.files?.[0]

        if (file) {
            this.setState({ logoURL: URL.createObjectURL(file) })
            const url = `logo/${uuidv4()}`
            const ref = await storage.child(url).put(file)
            const publicURL = await storage.child(url).getDownloadURL()
            this.state.charity.logo = publicURL

            this.setState({ logoURL: publicURL })
            console.log(ref)

        }
    }
}
