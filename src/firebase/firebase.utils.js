import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCaXZjEEUYKIuymJ3jee2efg-G3B0kFZRE",
    authDomain: "crwn-db-24fb3.firebaseapp.com",
    databaseURL: "https://crwn-db-24fb3.firebaseio.com",
    projectId: "crwn-db-24fb3",
    storageBucket: "crwn-db-24fb3.appspot.com",
    messagingSenderId: "390721450023",
    appId: "1:390721450023:web:f5c1ca8814af214985de02",
    measurementId: "G-NMTN59S1JB"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
