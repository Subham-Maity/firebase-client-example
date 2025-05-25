import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/firebase/firebase";

export const googleAuthProvider = new GoogleAuthProvider();
export function signInWithGoogle(): ReturnType<typeof signInWithPopup> {
    return signInWithPopup(auth, googleAuthProvider);
}
