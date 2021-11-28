import firebase from "firebase";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAzOE6rFcHkl3Qi-qdJO7dO8xkOzpa-Yrs",

  authDomain: "fir-67362.firebaseapp.com",

  databaseURL: "https://fir-67362.firebaseio.com",

  projectId: "fir-67362",

  storageBucket: "fir-67362.appspot.com",

  messagingSenderId: "414246536896",

  appId: "1:414246536896:web:f0d894ca2b37f20204cf25",

  measurementId: "G-6F9HJ0P12Y",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default firebase;
export { storage };
