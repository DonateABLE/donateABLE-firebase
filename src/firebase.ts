import * as firebaseApp from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: 'AIzaSyA1ZO5xqplSR5Tm368c5_tRJLLiU6hcJdA',
    authDomain: 'donateable-42f3d.firebaseapp.com',
    databaseURL: 'https://donateable-42f3d.firebaseio.com',
    projectId: 'donateable-42f3d',
    storageBucket: 'donateable-42f3d.appspot.com',
    messagingSenderId: '953734162120',
    appId: '1:953734162120:web:99111cbf9f357884aea7fd'
}

// Initialize Firebase
firebaseApp.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

// ADD THESE LINES
if (window.location.hostname === 'localhost') {
    console.log('localhost detected!')
    db.settings({
        host: 'localhost:8080',
        ssl: false,
    })
}

export const firestore = db