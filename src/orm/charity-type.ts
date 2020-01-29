import { SolidIconName } from 'components/icon'
import { firestore } from './firebase'
import Model from './model'

export default class CharityType extends Model {
    public readonly collection = firestore.collection('charity-type')

    @Model.field()
    public name: string = ''

    @Model.field()
    public icon: SolidIconName = 'question-circle'
}
