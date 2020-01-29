import Button from 'components/button'
import Content from 'components/content'
import TextBox from 'components/textbox'
import Layout from 'components/layout'
import SearchBar from 'components/search-bar'
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
                <div className={styles.buttongroup}>
                    <TextBox className={styles.groupelement}>Currently Donating &nbsp; <b>14</b></TextBox>
                    <TextBox className={styles.groupelement}>Donations to Date &nbsp; <b>345</b></TextBox>
                    <TextBox className={styles.groupelement}>
                        Total Hashes &nbsp; <b>{(13256475).toLocaleString()}</b>
                    </TextBox>
                    <Button className={styles.groupelement} color='white'>LOGIN</Button>
                    <Button className={styles.groupelement} color='dark'>SIGN UP</Button>
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
