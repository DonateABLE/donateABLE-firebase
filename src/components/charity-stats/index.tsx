import Progress from 'components/progress'
import Charity from 'orm/charity'
import { createElement, FunctionComponent } from 'react'
import { formatNumber } from 'utils'
import styles from './style.scss'

interface SectionProps {
    title: string
    value: number
    max: number
}

const Section: FunctionComponent<SectionProps> = props => (
    <div className={styles.section}>
        <Progress className={styles.loader} value={props.value} max={props.max} />
        <div className={styles.content}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.value}>{formatNumber(props.value)}</div>
        </div>
    </div>
)

interface Props {
    charity: Charity
}
const Statistics: FunctionComponent<Props> = props => (
    <div className={styles.stats}>
        <h3>{props.charity.longName} Statistics</h3>
        <div className={styles.grid}>
            <Section value={props.charity.currentlyDonating} max={5} title='Currently Donating' />
            <Section value={props.charity.donatorsToDate} max={50} title='Donators to Date' />
            <Section value={62_406_321} max={80_000_000} title='Total Hashes' />
            <Section value={2} max={3} title='Overall Charity Rank' />
        </div>
    </div>
)

export default Statistics
