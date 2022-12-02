import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBr-Umri6VmhRdk5HGONjyJ93rst4Siaxw",
    authDomain: "cloud-c64af.firebaseapp.com",
    databaseURL: "https://cloud-c64af-default-rtdb.firebaseio.com",
    projectId: "cloud-c64af",
    storageBucket: "cloud-c64af.appspot.com",
    messagingSenderId: "922594900743",
    appId: "1:922594900743:web:636dd1f67c0eb2e0d363a2"
  };

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = app.firestore();
  
// const app = firebase.initializeApp(firebaseConfig);
// const db = app.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

export {db,  auth, provider };