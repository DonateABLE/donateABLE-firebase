import Content, { FullWidth } from 'components/content'
import Icon from 'components/icon'
import { bind } from 'decko'
import CharityType from 'orm/charity-type'
import { useQuery } from 'orm/model'
import { createElement, FunctionComponent, useCallback, useRef, useState } from 'react'
import { addValue, bindArgs, classNames, clickedOn } from 'utils'
import styles from './style.scss'

export interface SearchQuery {
    search: string
    charityTypes: CharityType[]
}

interface Props {
    value: SearchQuery
    onChange: (query: SearchQuery) => void
}

const SearchBar: FunctionComponent<Props> = props => {
    const popup = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState(false)
    const charityTypes = useQuery(CharityType.builder()) ?? []

    const setSearch = useCallback((value: string) => {
        props.onChange({
            ...props.value,
            search: value,
        })
    }, [props.onChange])
    const enableCharityType = useCallback((charityTypeID: string) => {
        props.onChange({
            ...props.value,
            charityTypes: [
                // uncomment this if you want to be able to have multiple charity types selected
                // ...props.value.charityTypes.filter(ct => ct.id !== charityTypeID),
                ...charityTypes.filter(ct => ct.id === charityTypeID),
            ],
        })
    }, [charityTypes, props.onChange, props.value.charityTypes])
    const disableCharityType = useCallback((charityTypeID: string) => {
        props.onChange({
            ...props.value,
            charityTypes: [
                ...props.value.charityTypes.filter(ct => ct.id !== charityTypeID),
            ],
        })
    }, [charityTypes, props.onChange, props.value.charityTypes])

    const onBodyClick = useCallback((e: MouseEvent) => {
        if (clickedOn(e, popup.current)) {
            return
        }
        setOpen(false)
        document.body.removeEventListener('click', onBodyClick)
    }, [popup, setOpen])

    const onBarClick = useCallback(() => {
        setOpen(true)
        document.body.addEventListener('click', onBodyClick)
    }, [setOpen, onBodyClick])

    return <div
        className={styles.searchBar}
        ref={popup}
    >
        <div className={styles.bar} onClick={onBarClick}>
            <Content noPadding>
                <label className={styles.label} htmlFor='search' >
                    Search for charity
                        <Icon name='search' />
                </label>
            </Content>
        </div>

        {/* Return to the reason for this 

            <FullWidth
            className={classNames(styles.popup, {
                [styles.show]: open,
            })}
        >
            <h3 className={styles.label} >
                <label htmlFor='search' >Search by charity name</label>
            </h3>
            <input className={styles.input} id='search' type='text' placeholder='Type Charity Name Here...' />
            <h3 className={styles.label} >Search by charity type</h3>
            <div className={styles.categories}>
                {charityTypes.map(t => (
                    <div key={t.name} className={styles.category}>
                        <div className={styles.iconCircle}>
                            <Icon className={styles.icon} name={t.icon} />
                        </div>
                        <div className={styles.title}>{t.name} Charities</div>
                    </div>
                ))}
            </div>
        </FullWidth> */}
        
        <   FullWidth
            className={classNames(styles.popup, {
                [styles.show]: open,
            })}
        >
            <h3 className={styles.label} >
                <label htmlFor='search' >Search by charity name</label>
            </h3>
            <input
                className={styles.input}
                id='search'
                type='text'
                placeholder='Type Charity Name Here...'
                value={props.value.search}
                onChange={addValue(setSearch)}
            />
            <h3 className={styles.label} >Search by charity type</h3>
            <div className={styles.categories}>
                {charityTypes.map(t => {
                    let click: () => void
                    const active = props.value.charityTypes.includes(t)
                    if (active) {
                        click = bindArgs(t.id ?? '', disableCharityType)
                    } else {
                        click = bindArgs(t.id ?? '', enableCharityType)
                    }
                    return <div
                        key={t.name}
                        className={classNames(styles.category, {
                            [styles.active]: active,
                        })}
                        onClick={click}
                    >
                        <div className={styles.iconCircle}>
                            <Icon className={styles.icon} name={t.icon} />
                        </div>
                        <div className={styles.title}>{t.name} Charities</div>
                    </div>
                })}
            </div>
         </ FullWidth>
    </div >
}

export default SearchBar
