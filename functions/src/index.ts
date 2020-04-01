import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()


export const newUser = functions.auth
    .user()
    .onCreate(async user => {
        await db.collection('users')
            .doc(user.uid)
            .set({
                email: user.email,
            })
    });