import Button from 'components/button'
import { FullWidth } from 'components/content'
import Icon from 'components/icon'
import { createElement, Fragment, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'utils'
import styles from './style.scss'

interface Props {
    image: string
    imageAlt: string
    imageRound?: boolean
    onImageClick?: () => void
    imageClassName?: string

    title: string
    subtitle: string
    buttonTitle: string
    buttonLocation: string
}

const Header: FunctionComponent<Props> = props => {
    return <Fragment>
        <FullWidth className={styles.header}>
            <img
                className={classNames(styles.logo, props.imageClassName, { [styles.round]: props.imageRound })}
                src={props.image}
                alt={props.imageAlt}
                onClick={props.onImageClick}
            />
            <div className={styles.info}>
                <h2 className={styles.name}>{props.title}</h2>
                <div className={styles.tagLine}>{props.subtitle}</div>
            </div>
            <div>
                <HeaderButton href={props.buttonLocation} className={styles.makeDonation} >
                    {props.buttonTitle}
                </HeaderButton>
            </div>
        </FullWidth>
        <FullWidth className={styles.social} >
            <div className={styles.link}>
                <Icon className={styles.icon} name='facebook-f' />
                <span className={styles.title}>Share on Facebook</span>
            </div>
            <div className={styles.link}>
                <Icon className={styles.icon} name='twitter' />
                <span className={styles.title}>Share on twitter</span>
            </div>
            <div className={styles.link}>
                <Icon className={styles.icon} name='globe' />
                <span className={styles.title}>Visit charity website</span>
            </div>
        </FullWidth>
        <HeaderButton href={props.buttonLocation} className={styles.makeDonationLower} >
            {props.buttonTitle}
        </HeaderButton>
    </Fragment>
}

export default Header

const HeaderButton: FunctionComponent<{ href: string, className: string }> = props => {
    const internalLink = props.href.startsWith('/')

    const btn = <Button
        className={props.className}
        color='dark'
        size='medium'
    >
        {props.children} {!internalLink && <Icon name='external-link-alt' />}
    </Button>

    if (internalLink) {
        return <Link to={props.href}>
            {btn}
        </Link>
    }
    return <a href={props.href} target='_blank' >
        {btn}
    </a>
}
