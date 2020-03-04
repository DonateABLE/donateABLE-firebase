import Button from 'components/button'
import Content from 'components/content'
import TextBox from 'components/textbox'
import firebase from 'firebase'
import {createElement, Fragment, FunctionComponent, useEffect, useState} from 'react'
import { FirebaseAuth } from 'react-firebaseui'
import styles from './style.scss'

function useUser(): firebase.User | null  {
    const [userStatus, setUserStatus] = useState<firebase.User | null>(null)

    useEffect(() => {
        return firebase.auth().onAuthStateChanged( function (user) {
            if (user) {
                setUserStatus(user)
            } else {
                setUserStatus(null)
            }
        })
    }, [setUserStatus])
    return userStatus
}

const signOut = () => {
    firebase.auth().signOut()
}

const LoggedIn: FunctionComponent = () => {
    return <Fragment>
        <h2 className={styles.heading}>
            <span className={styles.light}>
                Welcome to Donateable <br />
            </span>
            You're Currently Signed In
        </h2>
        <Button className={styles.signOutButton} onClick={signOut}>Sign Out</Button>
    </Fragment>
}

const LoggedOut: FunctionComponent = () => {
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
    }
    return <Fragment>
        <h2 className={styles.heading}>
            Login or Signup
        </h2>
        <FirebaseAuth className={styles.fire} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Fragment>
}

export const Login: FunctionComponent = () => {
    const userStatus = useUser()

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
            {userStatus ? <LoggedIn /> : <LoggedOut />}
        </Content>
    </Fragment>
}

export default Login
