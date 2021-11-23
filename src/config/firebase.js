import firebase from "firebase";
import "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.API_KEY,

  authDomain: process.env.AUTH_DOMAIN,

  databaseURL: process.env.DATABASE_URL,

  projectId: process.env.PROJECT_ID,

  storageBucket: process.env.STORAGE_BUCKET,

  messagingSenderId: process.env.MESSAGING_STORAGE_ID,

  appId: process.env.APP_ID,

  measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default firebase;
export { storage };
