import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

class AuthService {
    login() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    logout() {
        signOut(auth);
    }
    onAuthChange(onUserChanged) {
        onAuthStateChanged(auth, (user) => {
            onUserChanged(user);
        });
    }
}

export default AuthService;