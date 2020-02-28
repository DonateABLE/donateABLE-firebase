import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import { Input, Select, TextArea } from 'components/form'
import Icon, { BrandIcons, IconName, RegularIcons, SolidIcons } from 'components/icon'
import { Modal, ModalBody, ModalControl, ModalHeader, openInfoModal, openModal } from 'components/modal'
import { Tab, TabContainer } from 'components/tabs'
import { bind, memoize } from 'decko'
import Charity, { DonationTarget } from 'orm/charity'
import { storage } from 'orm/firebase'
import { Component, createElement, FunctionComponent, ReactNode, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
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
                    title='Facebook'
                    value={charity.facebookUrl}
                    onChange={addValue(bindArgs('facebookUrl', this.charityChangeString))}
                />
                <Input
                    white
                    title='Twitter'
                    value={charity.twitterUrl}
                    onChange={addValue(bindArgs('twitterUrl', this.charityChangeString))}
                />
                <Input
                    white
                    title='Charity Website'
                    value={charity.websiteUrl}
                    onChange={addValue(bindArgs('websiteUrl', this.charityChangeString))}
                />
                <Input
                    white
                    title='Canada Helps Link'
                    value={charity.canadaHelpsUrl}
                    onChange={addValue(bindArgs('canadaHelpsUrl', this.charityChangeString))}
                />
            </FullWidth>
            <TabContainer>
                <Tab title='Donation Targets' >
                    <Button color='dark' onClick={this.targetAdd}>Add</Button>
                    <div className={styles.donationTargets}>
                        {charity.donationTargets.map((target, i) => (
                            <div className={styles.target} key={i}>
                                <div className={styles.iconWrapper}>
                                    <Icon className={styles.icon} name={target.icon} />
                                    <Button
                                        className={styles.button}
                                        onClick={bindArgs(i, this.changeIcon)}
                                    >
                                        Change Icon
                                    </Button>
                                </div>

                                <div>
                                    <Input
                                        title='Target Title'
                                        value={target.name}
                                        onChange={addValue(bindArgs(i, 'name', this.targetChangeString))}
                                    />
                                    <Input
                                        title='Dollar Amount'
                                        type='number'
                                        value={target.cost}
                                        onChange={addValue(bindArgs(i, 'cost', this.targetChangeNumber))}
                                    />
                                    <TextArea
                                        title='Brief Description'
                                        value={target.description}
                                        onChange={addValue(bindArgs(i, 'description', this.targetChangeString))}
                                    />
                                </div>

                                <Button color='danger' onClick={bindArgs(i, this.targetDelete)}>Delete</Button>
                            </div>
                        ))}
                    </div>

                </Tab>
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
            await storage.child(url).put(file)

            const publicURL = await storage.child(url).getDownloadURL()
            this.state.charity.logo = publicURL

            this.setState({ logoURL: publicURL })
        }
    }

    @bind
    private targetChangeString(
        index: number,
        field: FilterPropertyNames<DonationTarget, string>,
        value: string,
    ): void {
        this.setState(state => {
            state.charity.donationTargets[index][field] = value as any
            return { charity: state.charity }
        })
    }
    @bind
    private targetChangeNumber(
        index: number,
        field: FilterPropertyNames<DonationTarget, number>,
        value: string,
    ): void {
        this.setState(state => {
            state.charity.donationTargets[index][field] = Number(value) as any
            return { charity: state.charity }
        })
    }

    @bind
    private targetDelete(index: number): void {
        this.setState(state => {
            state.charity.donationTargets.splice(index, 1)
            return { charity: state.charity }
        })
    }

    @bind
    private targetAdd(): void {
        this.setState(state => {
            state.charity.donationTargets.push({
                name: '',
                cost: 0,
                description: '',
                icon: 'question-circle',
            })
            return { charity: state.charity }
        })
    }

    @bind
    private async changeIcon(index: number): Promise<void> {
        const ChangeIcon: FunctionComponent<{ ctl: ModalControl<IconName | undefined> }> = ({ ctl }) => {
            const [search, changeSearch] = useState('')

            return <Modal className={styles.iconChange} onCloseClick={ctl.close}>
                <ModalHeader>
                    Icon
                </ModalHeader>
                <ModalBody>
                    <Input
                        title='search'
                        value={search}
                        onChange={addValue(changeSearch)}
                    />
                    <div className={styles.iconList}>
                        {SolidIcons
                            .filter(i => i.includes(search))
                            .slice(0, 12)
                            .map(name => (
                                <div
                                    className={styles.option}
                                    key={name}
                                    onClick={bindArgs(name, ctl.resolve)}
                                >
                                    <Icon className={styles.icon} name={name} />
                                    <div className={styles.title}>{name.replace('-', ' ')}</div>
                                </div>
                            ))}
                    </div>
                </ModalBody>
            </Modal>
        }
        const icon = await openModal<IconName | undefined>(ctl => <ChangeIcon ctl={ctl} />, undefined)
        if (icon) {
            this.setState(state => {
                state.charity.donationTargets[index].icon = icon
                return { charity: state.charity }
            })
        }

    }
}
