import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    // apiKey: "AIzaSyBbzM-OQiY3F65qAsbkqy4AjsDcsj9Y9L8",
    // authDomain: "queuing-df236.firebaseapp.com",
    // projectId: "queuing-df236",
    // storageBucket: "queuing-df236.appspot.com",
    // messagingSenderId: "475602504574",
    // appId: "1:475602504574:web:6c20f70cc710a1455c812f"
    apiKey: "AIzaSyA3dUx4dWGZK017gNLQWY-m4ensFhJ-8o4",
    authDomain: "queuingsystem-9859f.firebaseapp.com",
    projectId: "queuingsystem-9859f",
    storageBucket: "queuingsystem-9859f.appspot.com",
    messagingSenderId: "87369686938",
    appId: "1:87369686938:web:f64f811e1e0a0a7adaa423"
};


export class FirebaseConfig {
    private static instance: FirebaseConfig | null = null;
    private fbApp: any = null;
    fbDB: any = null;
    auth: any = null;

    constructor() {
        this.fbApp = initializeApp(firebaseConfig);
        this.fbDB = getFirestore(this.fbApp);
        this.auth = getAuth(this.fbApp);
    }



    static getInstance() {
        if (this.instance == null) {
            this.instance = new FirebaseConfig();
        }

        return this.instance;
    }
}