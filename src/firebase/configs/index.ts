import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBbzM-OQiY3F65qAsbkqy4AjsDcsj9Y9L8",
    authDomain: "queuing-df236.firebaseapp.com",
    projectId: "queuing-df236",
    storageBucket: "queuing-df236.appspot.com",
    messagingSenderId: "475602504574",
    appId: "1:475602504574:web:6c20f70cc710a1455c812f"
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