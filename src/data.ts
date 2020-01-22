import { SolidIconName } from 'components/icon'

export interface CharityType {
    name: string
    icon: SolidIconName
}
export const charityTypes: CharityType[] = [
    {
        name: 'International',
        icon: 'globe-americas',
    },
    {
        name: 'Health',
        icon: 'briefcase-medical',
    },
    {
        name: 'Environmental',
        icon: 'leaf',
    },
    {
        name: 'Animal',
        icon: 'paw',
    },
    {
        name: 'Art & Culture',
        icon: 'paint-brush',
    },
    {
        name: 'Educational',
        icon: 'user-graduate',
    },
]

export interface Charity {
    name: string
    logo: string
    currentlyDonating: number
    donatorsToDate: number
    type: string
    icon: SolidIconName
    tagLine: string
    registeredBusinessName: string
    businessNumber: string
}

export const charities: Charity[] = (new Array(6)).fill(
    {
        name: 'Donatable',
        logo: 'https://donateable.ca/img/logo/D-Coloured-250x250.png',
        currentlyDonating: 2,
        donatorsToDate: 36,
        type: 'International',
        icon: charityTypes[0].icon,
        tagLine: 'The Donateable tagline',
        registeredBusinessName: 'Donateable inc',
        businessNumber: '123456789RR0001',
    },
)
