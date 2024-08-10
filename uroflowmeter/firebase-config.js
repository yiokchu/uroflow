import { getApp, getApps, initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// import SessionScreen from './navigation/screens/SessionScreen';
import { getAuth, initializeAuth, getReactNativePersistence, AuthCredential } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



//global.Buffer = require('buffer').Buffer;
// Initialize Firebase


export const firebaseConfig = {
    apiKey: "AIzaSyB0hpNqMRWn53Xk-z1sBYWUhiZ0vdMjHaE",
    authDomain: "esp32ufmtr.firebaseapp.com",
    databaseURL: "https://esp32ufmtr-default-rtdb.firebaseio.com",
    projectId: "esp32ufmtr",
    storageBucket: "esp32ufmtr.appspot.com",
    messagingSenderId: "71065566172",
    appId: "1:71065566172:web:4ae2be169b4b68839eed19",
};



export let app, auth;

if (!getApps().length) {
  // try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
  // } catch (error) {
  //   console.log("Error initializing app: " + error);
  // }
} else {
    app = getApp();
    auth = getAuth(app);
}