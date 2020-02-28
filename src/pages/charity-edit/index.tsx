import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import Input from 'components/form'
import Icon, { BrandIconName, SolidIconName } from 'components/icon'
import { openInfoModal } from 'components/modal'
import { Tab, TabContainer } from 'components/tabs'
import { bind, memoize } from 'decko'
import { isFirebaseError, storage } from 'fb'
import Charity from 'orm/charity'
import { Component, createElement, Fragment, FunctionComponent, ReactNode, SyntheticEvent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { addValue, bindArgs } from 'utils'
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
                        onChange={addValue(bindArgs('longName', this.charityChangeString))}
                    />
                    <Input
                        white
                        title='Tagline'
                        value={charity.tagline}
                        onChange={addValue(bindArgs('tagline', this.charityChangeString))}
                    />
                    <Input
                        white
                        title='Registered Business Name'
                        value={charity.registeredBusinessName}
                        onChange={addValue(bindArgs('registeredBusinessName', this.charityChangeString))}
                    />
                    <Input
                        white
                        title='Business Number'
                        value={charity.businessNumber}
                        onChange={addValue(bindArgs('businessNumber', this.charityChangeString))}
                    />
                </div>
            </FullWidth>
            <FullWidth className={styles.social}>
                <Input
                    white
                    iconBrand='facebook'
                    title='Facebook'
                    value={charity.facebookUrl}
                    onChange={addValue(bindArgs('facebookUrl', this.charityChangeString))}
                />
                <Input
                    white
                    iconBrand='twitter'
                    title='Twitter'
                    value={charity.twitterUrl}
                    onChange={addValue(bindArgs('twitterUrl', this.charityChangeString))}
                />
                <Input
                    white
                    title='Charity Website'
                    icon='globe'
                    value={charity.websiteUrl}
                    onChange={addValue(bindArgs('websiteUrl', this.charityChangeString))}
                />
                <Input
                    white
                    title='Canada Helps Link'
                    icon='money-bill'
                    value={charity.canadaHelpsUrl}
                    onChange={addValue(bindArgs('canadaHelpsUrl', this.charityChangeString))}
                />
            </FullWidth>
            <TabContainer>
                <Tab title='About Charity'>
                    <h3>About {charity.longName}</h3>
                    <textarea
                        className={styles.description}
                        value={charity.longDesc}
                        onChange={addValue(bindArgs('longDesc', this.charityChangeString))}
                    />
                    <h3>Contact {charity.longName}</h3>

                    <div className={styles.extraInfo}>
                        <Input
                            title='Street Address'
                            value={charity.address}
                            onChange={addValue(bindArgs('address', this.charityChangeString))}
                        />
                        <Input
                            title='City, Province'
                            value={charity.cityProvince}
                            onChange={addValue(bindArgs('cityProvince', this.charityChangeString))}
                        />
                        <Input
                            title='Postal Code'
                            value={charity.postalCode}
                            onChange={addValue(bindArgs('postalCode', this.charityChangeString))}
                        />
                        <Input
                            title='Phone'
                            value={charity.phone}
                            onChange={addValue(bindArgs('phone', this.charityChangeString))}
                        />
                        <Input
                            title='Fax'
                            value={charity.fax}
                            onChange={addValue(bindArgs('fax', this.charityChangeString))}
                        />
                        <Input
                            title='Email'
                            value={charity.email}
                            onChange={addValue(bindArgs('email', this.charityChangeString))}
                        />
                        <h4>Office Hours</h4>
                        <Input
                            title='Days'
                            value={charity.officeHourDays}
                            onChange={addValue(bindArgs('officeHourDays', this.charityChangeString))}
                        />
                        <Input
                            title='Hours'
                            value={charity.officeHourHours}
                            onChange={addValue(bindArgs('officeHourHours', this.charityChangeString))}
                        />
                    </div>
                </Tab>
                <Tab title='Donation Targets'>a</Tab>
            </TabContainer>

            <Button onClick={this.save}>Save</Button>
        </Content>
    }

    @bind
    private charityChangeString(field: FilterPropertyNames<Charity, string>, value: string): void {
        this.setState(state => {
            state.charity[field] = value as any
            return { charity: state.charity }
        })
    }

    @bind
    private async save(): Promise<void> {
        try {
            await this.state.charity.save()
            if (this.props.match.params.id !== this.state.charity.id) {
                this.props.history.push(`/charity/${this.state.charity.id}/edit`)
            }
        } catch (e) {
            if (isFirebaseError(e) && e.code === 'permission-denied') {
                alert('permission error')
                return
            }

            throw e
        }
    }

    @bind
    private async logoChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = e.currentTarget.files?.[0]

        if (file) {
            this.setState({ logoURL: URL.createObjectURL(file) })
            const url = `logo/${uuidv4()}`
            await storage.child(url).put(file)

            const publicURL = await storage.child(url).getDownloadURL()
            this.state.charity.logo = publicURL

            this.setState({ logoURL: publicURL })
        }
    }
}
