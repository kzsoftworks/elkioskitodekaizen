import * as firebase from "firebase";
import "@firebase/firestore";
import env from "./.environment";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIREBASE_DATABASE_URL,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGE_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

export default function initializeApp() {
  firebase.initializeApp(firebaseConfig);
  return firebase.firestore();
}
