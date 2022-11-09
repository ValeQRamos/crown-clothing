import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  setIndexConfiguration,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXBOY-IgNfevrzpbQkRJC9zGIzFWqqmDI",
  authDomain: "crown-clothing-8e9d0.firebaseapp.com",
  projectId: "crown-clothing-8e9d0",
  storageBucket: "crown-clothing-8e9d0.appspot.com",
  messagingSenderId: "921397787157",
  appId: "1:921397787157:web:7e5c5da13b3c4ad731ec1c",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
