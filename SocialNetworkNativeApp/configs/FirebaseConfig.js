import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    // apiKey : "AIzaSyDvvYbrWUUh5oiri6IOt17c8wvWzoHWTHw" , 
    // authDomain : "socialmediaapp-8a6af.firebaseapp.com" , 
    // databaseURL : "https://socialmediaapp-8a6af-default-rtdb.asia-southeast1.firebasedatabase.app" , 
    // projectId : "socialmediaapp-8a6af" , 
    // storageBucket : "socialmediaapp-8a6af.appspot.com" , 
    // messagingSenderId : "912174289026" , 
    // appId : "1:912174289026:web:984e9ae73102cedae2e49b" , 
    // measurementId : "G-MBMV6576NB"

    apiKey : "AIzaSyBR1zgJotPkYxbhS6tzybu8Jc_DPN0J8SU" , 
    authDomain : "chatapp-595c8.firebaseapp.com" , 
    databaseURL : "https://chatapp-595c8-default-rtdb.asia-southeast1.firebasedatabase.app" , 
    projectId : "chatapp-595c8" , 
    storageBucket : "chatapp-595c8.appspot.com" , 
    messagingSenderId : "976401792350" , 
    appId : "1:976401792350:web:c6f8c76d2c4abef5ea63cf" , 
    measurementId : "G-RMPLWWB4LL" 
};

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const db = getDatabase();

export { db };