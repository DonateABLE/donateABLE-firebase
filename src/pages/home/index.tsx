import Button from 'components/button'
import Content from 'components/content'
import SearchBar from 'components/search-bar'
import TextBox from 'components/textbox'
import Charity from 'orm/charity'
import CharityType from 'orm/charity-type'
import { useQuery } from 'orm/model'
import { Component, createElement, Fragment, FunctionComponent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from 'utils'
import CharityBox from './charity'
import styles from './style.scss'

const Home: FunctionComponent = () => {
    const charities = useQuery(Charity.builder().orderBy('longName')) ?? []
    const charityTypes = useQuery(CharityType.builder().orderBy('name')) ?? []

    return <Fragment>
        <div className={styles.top}>
            <h2 className={styles.heading}>
                <span className={styles.light}>Support local charities in Guelph</span> <br />
                without opening your wallet
        </h2>
            <div className={styles.buttonGroup}>
                <TextBox className={styles.groupElement}>
                    Currently Donating <b className={styles.value}>14</b>
                </TextBox>
                <TextBox className={styles.groupElement}>
                    Donations to Date<b className={styles.value}>345</b>
                </TextBox>
                <TextBox className={styles.groupElement}>
                    Total Hashes <b className={styles.value}>{formatNumber(13_256_475)}</b>
                </TextBox>
                <Link to='/login'>
                    <Button className={styles.groupElement} color='white'>Login</Button>
                    <Button className={styles.groupElement} color='dark'>Sign Up</Button>
                </Link>
            </div>
        </div>
        <SearchBar />
        <Content>
            <h2 className={styles.heading}>
                <span className={styles.light}>The Newest &amp; Easiest Way to Donate</span> <br />
                Everyone can contribute
        </h2>
            <div className={styles.charities}>
                {charities.map((c, i) => (
                    <CharityBox
                        key={c.longName + i}
                        charity={c}
                        charityTypes={charityTypes}
                    />
                ))}
            </div>
        </Content>
    </Fragment>
}

export default Home
