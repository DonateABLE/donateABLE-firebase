import { IconName } from 'components/icon'
import { firestore } from './firebase'
import Model, { useQuery } from './model'

export interface DonationTarget {
    name: string
    cost: number
    description: string
    icon: IconName
}

export default class User extends Model {
    public readonly collection = firestore.collection('user')

    @Model.field({ readonly: true })
    public userID: string = ''

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

    public get fullName(): string {
        return this.firstName + ' ' + this.lastName
    }
}

export function useUser(): User | undefined {
    const user = (useQuery(User.builder().limit(1)) ?? [])[0]
    if (user === undefined) {
        return
    }
    return user
}
