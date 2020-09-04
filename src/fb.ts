import * as firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { useQuery } from "orm/model";
import User from "orm/user";
import Charity from "orm/charity";
import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyA1ZO5xqplSR5Tm368c5_tRJLLiU6hcJdA",
    authDomain: "donateable-42f3d.firebaseapp.com",
    databaseURL: "https://donateable-42f3d.firebaseio.com",
    projectId: "donateable-42f3d",
    storageBucket: "donateable-42f3d.appspot.com",
    messagingSenderId: "953734162120",
    appId: "1:953734162120:web:99111cbf9f357884aea7fd",
};

// Initialize Firebase
firebaseApp.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const store = firebaseApp.storage();
let cloudFunctionPrefix = `https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net`;
if (__DEVELOPMENT__) {
    // tslint:disable-next-line: no-console
    console.log("Connecting to emulated firebase services");
    db.settings({
        host: "localhost:8080",
        ssl: false,
    });

    cloudFunctionPrefix = "http://localhost:5001/donateable-42f3d/us-central1";

    import("seed").then(async (seed) => {
        await seed.seedCharities();
        await seed.seedCharityTypes();
        await seed.seedUser();
    });
}

// Disabling persistence to stop offline caching
// db.enablePersistence({ synchronizeTabs: true });

export const firestore = db;

export const storage = store.ref();

export function isFirebaseError(
    err: unknown
): err is firebase.firestore.FirestoreError {
    return (
        typeof err === "object" &&
        err != null &&
        "name" in err &&
        (err as any).name === "FirebaseError" &&
        "code" in err
    );
}

export function useUser():
    | (User & { firebaseUser?: firebase.User })
    | undefined {
    const [fbUser, setFbUser] = useState<firebase.User | undefined>(undefined);
    const [user, setUser] = useState<
        (User & { firebaseUser?: firebase.User }) | undefined
    >(undefined);

    useEffect(() => {
        return firebaseApp.auth().onAuthStateChanged((u) => {
            setFbUser(u ?? undefined);
        });
    }, [setFbUser]);

    useEffect(() => {
        if (fbUser === undefined) {
            return;
        }
        return User.subscribe(fbUser.uid, (u) => {
            setUser(u ?? undefined);
        });
    }, [fbUser, setUser]);

    if (user === undefined) {
        return undefined;
    }

    user.firebaseUser = fbUser;
    return user;
}

export const signOut = (): void => {
    firebaseApp.auth().signOut();
    window.location.reload();
};

export const currentUser = firebaseApp
    .auth()
    .onAuthStateChanged((user) => (user ? true : false));

export function cloudFunction(
    name: string,
    init?: RequestInit
): Promise<Response> {
    return fetch(cloudFunctionPrefix + "/" + name, init);
}

export function totalCharityStats(): any {
    const charities = useQuery(Charity.builder().orderBy("totalHashes")) ?? [];
    const sumHashes =
        (charities[0]?.totalHashes +
            charities[1]?.totalHashes +
            charities[2]?.totalHashes) |
        0;
    const sumCurrentlyDonating =
        (charities[0]?.currentlyDonating +
            charities[1]?.currentlyDonating +
            charities[2]?.currentlyDonating) |
        0;
    const sumDonatorsToDate =
        (charities[0]?.donatorsToDate +
            charities[1]?.donatorsToDate +
            charities[2]?.donatorsToDate) |
        0;

    const charityTotals = [sumCurrentlyDonating, sumDonatorsToDate, sumHashes];
    return charityTotals;
}
