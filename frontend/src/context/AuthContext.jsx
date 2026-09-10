import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { uid, name, email, role } or null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const profile = userDoc.exists() ? userDoc.data() : {};
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: profile.name || '',
          role: profile.role || 'user',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async ({ name, email, password }) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const role = 'user'; // admins are promoted manually in Firestore for now
    await setDoc(doc(db, 'users', credential.user.uid), { name, email, role });
    setUser({ uid: credential.user.uid, name, email, role });
    return credential.user;
  };

  const login = async ({ email, password }) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
    const profile = userDoc.exists() ? userDoc.data() : {};
    const loggedInUser = {
      uid: credential.user.uid,
      email: credential.user.email,
      name: profile.name || '',
      role: profile.role || 'user',
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}