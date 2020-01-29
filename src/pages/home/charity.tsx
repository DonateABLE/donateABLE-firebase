import Icon from 'components/icon'
import Charity from 'orm/charity'
import { createElement, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'utils'
import styles from './style.scss'

interface Props {
    charity: Charity
    className?: string
}

const CharityBox: FunctionComponent<Props> = ({ className, charity }) => (
    <div className={classNames(styles.charity, className)}>
        <img className={styles.logo} src={charity.logo} alt={charity.longName + ' logo'} />
        <div className={styles.name}>{charity.longName}</div>
        <div className={styles.type}><Icon name={charity.type.icon} /></div>
        <div className={styles.currentlyDonating}>Currently Donating: <b>{charity.currentlyDonating}</b></div>
        <div className={styles.donatorsToDate}>Donators to Date: <b>{charity.donatorsToDate}</b></div>
        <div className={styles.social}>
            <button className={styles.icon}>
                <Icon brand name='facebook-f' />
            </button>
            <button className={styles.icon}>
                <Icon brand name='twitter' />
            </button>
            <button className={styles.icon}>
                <Icon name='globe' />
            </button>
        </div>
        <Link to={`/charity/${charity.longName}`}>
            <div className={styles.donate}>Donate</div>
        </Link>
    </div>
)

export default CharityBox
