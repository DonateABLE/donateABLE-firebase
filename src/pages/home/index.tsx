import Button from 'components/button'
import Content from 'components/content'
import Layout from 'components/layout'
import SearchBar from 'components/search-bar'
import TextBox from 'components/textbox'
import { charities } from 'data'
import { Component, createElement, Fragment, ReactNode } from 'react'
import Charity from './charity'
import styles from './style.scss'

export default class Home extends Component {
    public render(): ReactNode {
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
                        Total Hashes <b className={styles.value}>{(13256475).toLocaleString()}</b>
                    </TextBox>
                    <Button className={styles.groupElement} color='white'>Login</Button>
                    <Button className={styles.groupElement} color='dark'>Sign Up</Button>
                </div>
            </div>
            <SearchBar />
            <Content>
                <h2 className={styles.heading}>
                    <span className={styles.light}>The Newest &amp; Easiest Way to Donate</span> <br />
                    Everyone can contribute
                </h2>
                <div className={styles.charities}>
                    {charities.map((c, i) => <Charity key={c.name + i} charity={c} />)}
                </div>
            </Content>
        </Fragment>
    }
}
