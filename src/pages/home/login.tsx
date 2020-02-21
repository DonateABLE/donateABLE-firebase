import Content from 'components/content'
import TextBox from 'components/textbox'
import firebase from 'firebase'
import { Component, createElement, Fragment, ReactNode } from 'react'
import { FirebaseAuth } from 'react-firebaseui'
import styles from './style.scss'

export default class Login extends Component {

    public uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/charity',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
    }

    public render(): ReactNode {
        return <Fragment>
            <div className={styles.top}>
                <h2 className={styles.heading}>
                    <span className={styles.light}>
                        Track your stats with your own account
                    </span> <br />
                    and keep track of your donations
                </h2>
                <div className={styles.loginButtonGroup}>
                    <TextBox className={styles.loginGroupElement}>
                        Currently Donating <b className={styles.value}>14</b>
                    </TextBox>
                    <TextBox className={styles.loginGroupElement}>
                        Donations to Date<b className={styles.value}>345</b>
                    </TextBox>
                    <TextBox className={styles.loginGroupElement}>
                        Total Hashes <b className={styles.value}>{(13256475).toLocaleString()}</b>
                    </TextBox>
                </div>
            </div>
            <Content className={styles.login}>
                <h2 className={styles.heading}>
                    Login or Signup
                </h2>
                <FirebaseAuth className={styles.fire} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            </Content>
        </Fragment>
    }
}
