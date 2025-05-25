import {FacebookAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/firebase/firebase";

export const facebookAuthProvider = new FacebookAuthProvider();

export function  signInWithFacebook(): ReturnType<typeof signInWithPopup> {
    return signInWithPopup(auth, facebookAuthProvider);
}
