import { IconName } from 'components/icon'
import { firestore } from 'fb'
import Model from './model'

export default class CharityType extends Model {
    public readonly collection = firestore.collection('charityType')

    @Model.field()
    public name: string = ''

    @Model.field()
    public icon: IconName = 'question-circle'
}
