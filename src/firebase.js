// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBMFBWJdx_u2tSH5Q7DWVvnR2mC5gTqEdE",
    authDomain: "slack-cone-c0ca8.firebaseapp.com",
    projectId: "slack-cone-c0ca8",
    storageBucket: "slack-cone-c0ca8.appspot.com",
    messagingSenderId: "120149894038",
    appId: "1:120149894038:web:12a16a755e6cb5774933b7",
    measurementId: "G-5BEXTN4CTV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  const imageDB = getStorage(firebaseApp);
  export {auth,provider,imageDB};
  export default db;