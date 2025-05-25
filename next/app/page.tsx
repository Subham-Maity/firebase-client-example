"use client";
import { useSession } from "@/hooks/use-session";
import { auth } from "@/firebase/firebase";
import {signInWithFacebook} from "@/firebase/provider/facebook-firebase.provider";
import {signInWithGoogle} from "@/firebase/provider/google-firebase.provider";

export default function Home() {
  const { status , user } = useSession();

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const userCredentials = await signInWithGoogle();
      const idToken = await userCredentials.user.getIdToken();
      await fetch("http://localhost:3334/xam/auth/login/customer?provider=social", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleFacebookSignIn = async (): Promise<void> => {
    try {
      const userCredentials = await signInWithFacebook();
      const idToken = await userCredentials.user.getIdToken();
      await fetch("http://localhost:3334/xam/auth/login/customer?provider=social", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch("http://localhost:3334/xam/auth/logout/customer", {
        method: "POST",
        credentials: "include"
      });
      await auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (status === "loading") {
    return <div className="p-4">Loading...</div>;
  }

  return (
      <div className="p-4">
        {status !== "authenticated" ? (
            <div className="space-y-2">
              <button
                  onClick={handleGoogleSignIn}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Google
              </button>
              <button
                  onClick={handleFacebookSignIn}
                  className="px-4 py-2 bg-blue-700 text-white rounded"
              >
                Facebook
              </button>
            </div>
        ) : (
            <>
            <p>{JSON.stringify(user)}</p>
            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
            </>
        )}
      </div>
  );
}