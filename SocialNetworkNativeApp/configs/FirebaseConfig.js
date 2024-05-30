import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey : "AIzaSyAiEHcqvXZV0hg3cBweJHfOwmrqVG85M-k" , 
    authDomain : "fir-expotest-1c8bf.firebaseapp.com" , 
    databaseURL : "https://fir-expotest-1c8bf-default-rtdb.asia-southeast1.firebasedatabase.app" , 
    projectId : "fir-expotest-1c8bf" , 
    storageBucket : "fir-expotest-1c8bf.appspot.com" , 
    messagingSenderId : "259893188656" , 
    appId : "1:259893188656:web:338cae45b90b9796a0f5f5" , 
    measurementId : "G-08V4CC63W5"
};

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const db = getDatabase();

export { db };