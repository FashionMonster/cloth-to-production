import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

//Firebase 設定
var firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

//Firebase Storage 初期化
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.storage();
}

export { firebase as fb };
