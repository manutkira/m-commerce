 import firebase from "firebase/app";
 import 'firebase/firestore'
 import 'firebase/storage'

 const firebaseConfig = {
        apiKey: "AIzaSyBH0lTnQC3Mt1dMBOa1b6PSzkrWrRBkK2k",
        authDomain: "m-commerce-3f285.firebaseapp.com",
        projectId: "m-commerce-3f285",
        storageBucket: "m-commerce-3f285.appspot.com",
        messagingSenderId: "341450946044",
        appId: "1:341450946044:web:268e97e32bd34dcf59ae79"
      };

 const firebaseApp = firebase.initializeApp(firebaseConfig)
 const db = firebase.firestore()
 const firestore = firebaseApp.firestore()

 export {firebaseApp, db, firestore}