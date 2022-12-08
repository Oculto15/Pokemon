// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAwsjL9VxNYv0-UDkMFg5ab94xeDJl-cW8",
//   authDomain: "pokemonteam4-c95d5.firebaseapp.com",
//   projectId: "pokemonteam4-c95d5",
//   storageBucket: "pokemonteam4-c95d5.appspot.com",
//   messagingSenderId: "836729929278",
//   appId: "1:836729929278:web:28d86e94b9e78ffc821b6f",
//   measurementId: "G-PNRT88RGBS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFireStore(app);
// const analytics = getAnalytics(app);

// const app = firebase.initializeApp(firebaseConfig);
// const db = app.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBr-Umri6VmhRdk5HGONjyJ93rst4Siaxw',
  authDomain: 'cloud-c64af.firebaseapp.com',
  databaseURL: 'https://cloud-c64af-default-rtdb.firebaseio.com',
  projectId: 'cloud-c64af',
  storageBucket: 'cloud-c64af.appspot.com',
  messagingSenderId: '922594900743',
  appId: '1:922594900743:web:636dd1f67c0eb2e0d363a2'
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = app.firestore();

export {
  db,
  auth,
  provider
};
