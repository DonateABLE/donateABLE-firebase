import Charity from 'orm/charity'
import charities from './charity.json'

for (const c of charities) {
    const charity = new Charity()
    for (const [key, val] of Object.entries(c)) {
        (charity as any)[key] = val
    }
    charity.save()
}
