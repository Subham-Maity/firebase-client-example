import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: "xxxxx-yyyyy-zzzz",
    authDomain: "xam.firebaseapp.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Rest of your code remains the same...
onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
        try {
            const response = await fetch('http://localhost:3334/xam/auth/me', {
                credentials: 'include'
            });
            const userData = await response.json();
            updateUI(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            updateUI(null);
        }
    } else {
        updateUI(null);
    }
});

async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        await fetch('http://localhost:3334/xam/auth/login/customer?provider=social', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken })
        });
    } catch (error) {
        console.error('Google sign-in error:', error);
    }
}

async function signInWithFacebook() {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const idToken = await result.user.getIdToken();
        await fetch('http://localhost:3334/xam/auth/login/customer?provider=social', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken })
        });
    } catch (error) {
        console.error('Facebook sign-in error:', error);
    }
}

async function logout() {
    try {
        await fetch('http://localhost:3334/xam/auth/logout/customer', {
            method: 'POST',
            credentials: 'include'
        });
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error);
    }
}

function updateUI(user) {
    const userInfo = document.getElementById('user-info');
    const logoutButton = document.getElementById('logout');
    const signInButtons = document.querySelectorAll('#google-signin, #facebook-signin');

    if (user) {
        userInfo.textContent = JSON.stringify(user, null, 2);
        userInfo.style.display = 'block';
        logoutButton.style.display = 'block';
        signInButtons.forEach(button => button.style.display = 'none');
    } else {
        userInfo.textContent = '';
        userInfo.style.display = 'none';
        logoutButton.style.display = 'none';
        signInButtons.forEach(button => button.style.display = 'block');
    }
}

document.getElementById('google-signin').addEventListener('click', signInWithGoogle);
document.getElementById('facebook-signin').addEventListener('click', signInWithFacebook);
document.getElementById('logout').addEventListener('click', logout);