import { IconName } from 'components/icon'
import { firestore } from './firebase'
import Model from './model'

export interface DonationTarget {
    name: string
    cost: number
    description: string
    icon: IconName
}

export default class Charity extends Model {
    public readonly collection = firestore.collection('charity')

    @Model.field()
    public shortName: string = ''

    @Model.field()
    public longName: string = ''

    @Model.field()
    public logo: string = ''

    @Model.field()
    public shortDesc: string = ''

    @Model.field()
    public longDesc: string = ''

    @Model.field()
    public tagline: string = ''

    @Model.field()
    public facebookUrl: string = ''

    @Model.field()
    public twitterUrl: string = ''

    @Model.field()
    public websiteUrl: string = ''

    @Model.field()
    public canadaHelpsUrl: string = ''

    @Model.field()
    public siteKey: string = ''

    @Model.field()
    public comingSoon: boolean = false

    @Model.field()
    public currentlyDonating: number = 0

    @Model.field()
    public donatorsToDate: number = 0

    @Model.field()
    public typeName: string = ''

    @Model.field()
    public typeIcon: IconName = 'question-circle'

    @Model.field()
    public registeredBusinessName: string = ''

    @Model.field()
    public businessNumber: string = ''

    @Model.field()
    public address: string = ''

    @Model.field()
    public cityProvince: string = ''

    @Model.field()
    public postalCode: string = ''

    @Model.field()
    public phone: string = ''

    @Model.field()
    public email: string = ''

    @Model.field()
    public fax: string = ''

    @Model.field()
    public officeHourDays: string = ''

    @Model.field()
    public officeHourHours: string = ''

    @Model.field()
    public donationTargets: DonationTarget[] = []

    public url(): string {
        return `/charity/${this.longName.replace(/ /g, '_')}`
    }
}
