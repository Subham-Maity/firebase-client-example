"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

async function fetchUser() {
    const response = await fetch("http://localhost:3334/xam/auth/me", {
        credentials: "include"
    });
    return response.json();
}

export function useSession() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
            if (firebaseUser) {
                try {
                    const userData = await fetchUser();
                    setUser(userData);
                    setStatus("authenticated");
                } catch (error) {
                    console.error("Error during session check:", error);
                    setUser(null);
                    setStatus("unauthenticated");
                }
            } else {
                setUser(null);
                setStatus("unauthenticated");
            }
        });

        return () => unsubscribe();
    }, []);

    return { user, status };
}