import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const newUser = functions.auth.user().onCreate(async (user) => {
    // const displayName = String(user.displayName);
    // const firstName = displayName?.substr(0, displayName.indexOf(" "));
    // const lastName = displayName?.substr(displayName.indexOf(" " + 1));
    await db.collection("user").doc(user.uid).set({
        email: user.email,
    });
});
