import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import { Input } from 'components/form'
import TextBox from 'components/textbox'
import { signOut, useUser } from 'fb'
import firebase from 'firebase'
import { createElement, Fragment, FunctionComponent, useState } from 'react'
import { FirebaseAuth } from 'react-firebaseui'
import styles from './style.scss'
import { addValue } from 'utils'

const LoggedIn: FunctionComponent = () => {
    return <Fragment>
        <h2 className={styles.heading}>
            <span className={styles.light}>
                Welcome to Donateable <br />
            </span>
            You're Currently Signed In
        </h2>
        <Button className={styles.formButton} onClick={signOut}>Sign Out</Button>
    </Fragment>
}

const LoggedOut: FunctionComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] =  useState('')

    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
    }

    const newSignUpEmailPassword = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch( error => {
            const errorCode = error.code

            switch (errorCode) {
                case 'auth/invalid-email':
                    alert('This is not a valid email address.')
                    break

                case 'auth/weak-password':
                    alert('Weak password. Try adding more alphanumeric and special characters.')
                    break

                default:
                    existingUserEmailPassword()
                    break
            }
        })
    }

    const existingUserEmailPassword = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch( error => {
            const errorCode = error.code

            switch (errorCode) {
                case 'auth/wrong-password':
                    alert('Your password is wrong.')
                    break

                case 'auth/user-disabled':
                    alert('The given user has been disabled, please contact support for assistance.')
                    break

                default:
                    alert('The current user has not been found.')
                    break
            }
        })
    }

    const passwordReset = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .catch ( error => {
            const errorCode = error.code

            switch (errorCode) {
                case 'auth/invalid-email':
                    alert('Invalid email, please input a valid address.')
                    break
                case 'auth/user-not-found':
                    alert('User not found, email address is not linked with an account.')
                    break
            }
        })
        alert('Check your email, your password has been reset')
    }

    return <Fragment>
        <h2 className={styles.heading}>
            Login or Signup
        </h2>
            <h3>Sign in with Email</h3>
            <Input
                white
                title='Email Address'
                value={email}
                onChange={addValue(setEmail)}
                type='email'
            />
            <Input
                white
                title='Password'
                value={password}
                onChange={addValue(setPassword)}
                type='password'
            />
            <Button className={styles.formButton} onClick={newSignUpEmailPassword}>Submit</Button>
            <Button className={styles.formButton} onClick={passwordReset}>Forgot Your Password?</Button>
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