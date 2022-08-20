import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyANH2N2kJi-dc4kbHxcSjSydzFgxR0R8J0",
    authDomain: "budget-5224b.firebaseapp.com",
    projectId: "budget-5224b",
    storageBucket: "budget-5224b.appspot.com",
    messagingSenderId: "834844218706",
    appId: "1:834844218706:web:1b834f7713021885c7568b",
    measurementId: "G-YT8XDYP0QT"
    /*
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID ,
    appId:process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID

     */
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth()


