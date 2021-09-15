 import firebase from "firebase/app";
 import 'firebase/firestore'
 import 'firebase/storage'

 const firebaseConfig = {
    apiKey: "AIzaSyDgNCbWLFsgeHKK5o6Uu4927tab4BEbwuU",
    authDomain: "m-commerce-58682.firebaseapp.com",
    projectId: "m-commerce-58682",
    storageBucket: "m-commerce-58682.appspot.com",
    messagingSenderId: "116982103468",
    appId: "1:116982103468:web:f49881e1160d5e66740e09"
  };

 const firebaseApp = firebase.initializeApp(firebaseConfig)
 const db = firebase.firestore()
 const firestore = firebaseApp.firestore()

 export {firebaseApp, db, firestore}