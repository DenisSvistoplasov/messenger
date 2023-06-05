import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import {initializeApp} from "firebase/app";
import {browserSessionPersistence, getAuth, setPersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DB_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DB_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_DB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_DB_APP_ID,
};

// const app = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence);
