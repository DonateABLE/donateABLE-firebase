import Icon from 'components/icon'
import Popup from 'components/popup'
import Charity from 'orm/charity'
import CharityType from 'orm/charity-type'
import { createElement, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'utils'
import styles from './style.scss'

interface Props {
    charity: Charity
    className?: string
    charityTypes: CharityType[]
}

const CharityBox: FunctionComponent<Props> = ({ className, charity, charityTypes }) => (
    <div className={classNames(styles.charity, className)}>
        <img className={styles.logo} src={charity.logo} alt={charity.longName + ' logo'} />
        <div className={styles.name}>{charity.longName}</div>
        <div className={styles.type}>
            <Popup openButton={<Icon name={charity.typeIcon} />}>
                {charityTypes.map(t => (
                    <div key={t.name} className={styles.category}>
                        <div className={styles.iconCircle}>
                            <Icon className={styles.icon} name={t.icon} />
                        </div>
                        <div className={styles.title}>{t.name} Charities</div>
                    </div>
                ))}
            </Popup>
        </div>
        <div className={styles.currentlyDonating}>Currently Donating: <b>{charity.currentlyDonating}</b></div>
        <div className={styles.donatorsToDate}>Donators to Date: <b>{charity.donatorsToDate}</b></div>
        <div className={styles.social}>
            <button className={styles.icon}>
                <Icon name='facebook-f' />
            </button>
            <button className={styles.icon}>
                <Icon name='twitter' />
            </button>
            <button className={styles.icon}>
                <Icon name='globe' />
            </button>
        </div>
        <Link to={`/charity/${charity.longName.replace(/ /g, '_')}`}>
            <div className={styles.donate}>Donate</div>
        </Link>
    </div>
)

export default CharityBox
