import * as firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { useEffect, useState } from 'react'

const firebaseConfig = {
    apiKey: 'AIzaSyA1ZO5xqplSR5Tm368c5_tRJLLiU6hcJdA',
    authDomain: 'donateable-42f3d.firebaseapp.com',
    databaseURL: 'https://donateable-42f3d.firebaseio.com',
    projectId: 'donateable-42f3d',
    storageBucket: 'donateable-42f3d.appspot.com',
    messagingSenderId: '953734162120',
    appId: '1:953734162120:web:99111cbf9f357884aea7fd',
}

// Initialize Firebase
firebaseApp.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const store = firebaseApp.storage()
let cloudFunctionPrefix = `https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net`
if (__DEVELOPMENT__) {
    // tslint:disable-next-line: no-console
    console.log('Connecting to emulated firebase services')
    db.settings({
        host: 'localhost:8080',
        ssl: false,
    })

    cloudFunctionPrefix = 'http://localhost:5001/donateable-42f3d/us-central1'

    import('seed').then(async seed => {
        await seed.seedCharities()
        await seed.seedCharityTypes()
    })
}

db.enablePersistence({ synchronizeTabs: true })

export const firestore = db

export const storage = store.ref()

export function isFirebaseError(err: unknown): err is firebase.firestore.FirestoreError {
    return typeof err === 'object'
        && err != null
        && 'name' in err && (err as any).name === 'FirebaseError'
        && 'code' in err

}

export function useUser(): firebase.User | null {
    const [userStatus, setUserStatus] = useState<firebase.User | null>(null)

    useEffect(() => {
        return firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                setUserStatus(user)
            } else {
                setUserStatus(null)
            }
        })
    }, [setUserStatus])
    return userStatus
}

export const signOut = () => firebaseApp.auth().signOut()
export const currentUser = firebaseApp.auth().onAuthStateChanged(user => user ? true : false)
export function cloudFunction(name: string, init?: RequestInit): Promise<Response> {
    return fetch(cloudFunctionPrefix + '/' + name, init)
}
