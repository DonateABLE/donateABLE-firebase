import { IconName } from 'components/icon'
import { firestore } from 'fb'
import Model, { useQuery } from './model'

export interface DonationTarget {
    name: string
    cost: number
    description: string
    icon: IconName
}

export default class User extends Model {
    public readonly collection = firestore.collection('user')

    @Model.field()
    public firstName: string = ''

    @Model.field()
    public lastName: string = ''

    @Model.field()
    public user: string = ''

    @Model.field()
    public email: string = ''

    @Model.field()
    public portrait: string | undefined

    @Model.field()
    public getEmails: boolean = false

    public get fullName(): string {
        return this.firstName + ' ' + this.lastName
    }
}
