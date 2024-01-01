import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../store/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

interface AuthContextValue {
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: (setCurrentUser:React.SetStateAction<any>) => void;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  user?: any;
  setDetails(
    id: string,
    email: string,
    contact: string,
    name: string
  ): Promise<unknown>;
  getDetails(id: string): Promise<unknown>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({});
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut(setCurrentUser:React.SetStateAction<any>) {
    return signOut(auth)
      .then(() => {
        setUser({})
        setCurrentUser(undefined)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function setDetails(
    id: string,
    email: string,
    contact: string,
    name: string
  ) {
    return setDoc(doc(db, "users", id), {
      email,
      contact,
      name,
    });
  }
  async function getDetails(id: string) {
    try {
      const snapshot = await getDoc(doc(db, "users", id));
      const data = snapshot.data();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });
  return (
    <AuthContext.Provider
      value={{ signUp, logOut, logIn, user, setDetails, getDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
