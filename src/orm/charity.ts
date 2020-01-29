import { SolidIconName } from 'components/icon'
import { firestore } from './firebase'
import Model from './model'

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
    public socialFeed: string = ''

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
    public type: { name: string, icon: SolidIconName } = { name: '', icon: 'question-circle' }

    @Model.field()
    public registeredBusinessName: string = ''

    @Model.field()
    public businessNumber: string = ''
}
