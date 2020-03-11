import Icon from 'components/icon'
import Popup from 'components/popup'
import { __ } from 'lang'
import Charity from 'orm/charity'
import CharityType from 'orm/charity-type'
import { createElement, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
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
            <FacebookShareButton
                url={'https://donateable.ca' + charity.url()}
                quote={__('home.charity.social.facebook.message', { charity: charity.longName })}
                hashtag={'#' + __('home.charity.social.facebook.hashtag')}
                className={styles.icon}
            >
                <Icon name='facebook-f' />
            </FacebookShareButton>
            <TwitterShareButton
                url={'https://donateable.ca' + charity.url()}
                title={__('home.charity.social.twitter.message', { charity: charity.longName })}
                hashtags={[__('home.charity.social.twitter.hashtag')]}
                className={styles.icon}
            >
                <Icon name='twitter' />
            </TwitterShareButton>
            <a href={charity.websiteUrl} target='_blank' className={styles.icon}>
                <Icon name='globe' />
            </a>
        </div>
        <Link to={`/charity/${charity.longName.replace(/ /g, '_')}`}>
            <div className={styles.donate}>Donate</div>
        </Link>
    </div>
)

export default CharityBox
