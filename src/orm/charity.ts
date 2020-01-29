import { SolidIconName } from 'components/icon'
import { firestore } from 'firebase'
import Model from './model'

export default class Charity extends Model {
    public readonly collection = firestore.collection('charity')

    @Model.field()
    public name: string = ''

    @Model.field()
    public logo: string = ''

    @Model.field()
    public currentlyDonating: number = 0

    @Model.field()
    public donatorsToDate: number = 0

    @Model.field()
    public type: string = ''

    @Model.field()
    public icon: SolidIconName = 'question-circle'

    @Model.field()
    public tagLine: string = ''

    @Model.field()
    public registeredBusinessName: string = ''

    @Model.field()
    public businessNumber: string = ''
}
