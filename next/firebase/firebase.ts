import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth} from "firebase/auth";
import {firebaseConfig} from "@/firebase/config";

export const firebaseApp =
    getApps().length > 0
        ? getApp()
        : initializeApp({
            apiKey: firebaseConfig.apiKey,
            authDomain: firebaseConfig.authDomain,
        });
export const auth = getAuth(firebaseApp);

