import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAf0GZ99dbEZWSpBX04wDOldEMvi_01g7g',
  authDomain: 'eventbuddy-1c2c3.firebaseapp.com',
  projectId: 'eventbuddy-1c2c3',
  storageBucket: 'eventbuddy-1c2c3.firebasestorage.app',
  messagingSenderId: '83395308571',
  appId: '1:83395308571:web:34faca00b51d7acb8d5cbe',
};

if (!firebase.apps.length){ 
firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
