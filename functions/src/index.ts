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

export const makeAdmin = functions.https.onRequest(async (req, res) => {
    const idToken = req.body.idToken;

    const claims = await admin.auth().verifyIdToken(idToken)

    // Check if the user should be able to be an admin, this could be an email
    // check or one already admin user could make another user an admin
    if (claims.email_verified && claims.email?.endsWith('@admin.example.com')) {

        await admin.auth().setCustomUserClaims(claims.sub, { admin: true })

        res.end(JSON.stringify({ status: 'success' }))
    } else {
        res.end(JSON.stringify({ status: 'ineligible' }))
    }
});