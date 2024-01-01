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
import { auth, db, storage } from "../store/firebase";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

type AuthContextValue = {
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: (setCurrentUser: React.SetStateAction<any>) => void;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  user?: any;
  setDetails(
    id: string,
    email: string,
    contact: string,
    name: string
  ): Promise<unknown>;
  setProduct(
    id: string,
    userId: string,
    name: string,
    category: string,
    price: number,
    imageUrl: string
  ): Promise<unknown>;
  getDetails(id: string): Promise<unknown>;
  uploadImage(image: Blob): Promise<string>;
  getAllData(): Promise<[]>;
  getProduct(id: string): Promise<any>;
  deleteProduct(id: string): void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut(setCurrentUser: React.SetStateAction<any>) {
    return signOut(auth)
      .then(() => {
        setUser({});
        setCurrentUser(undefined);
        toast.success("Successfully loggedOut", {
          id: "logOut",
        });
        navigate("/signIn");
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
  function setProduct(
    id: string,
    userId: string,
    name: string,
    category: string,
    price: number,
    imageUrl: string
  ): Promise<void> {
    return setDoc(doc(db, "products", id), {
      name,
      price,
      category,
      imageUrl,
      userId,
      createAt: new Date().toDateString(),
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
  async function getProduct(id: string) {
    try {
      const snapshot = await getDoc(doc(db, "products", id));
      const data = snapshot.data();
      return data;
    } catch (error) {
      console.log("Error while getting product", error);
      throw error;
    }
  }
  async function uploadImage(image: Blob) {
    try {
      // @ts-ignore
      const storageRef = ref(storage, `/image/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
  async function getAllData(): Promise<[]> {
    const querySnapshot = await getDocs(collection(db, "products"));
    const dataArray: [] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data["id"] = doc.id;
      // @ts-ignore
      dataArray.push(data);
    });
    return dataArray;
  }
  async function deleteProduct(id: string) {
    try {
      if (!id) throw new Error("Invalid Id.");
      await deleteDoc(doc(db, "products", id));
      console.log("deleted");
    } catch (error) {
      console.log(error);
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
      value={{
        signUp,
        logOut,
        logIn,
        user,
        setDetails,
        getDetails,
        uploadImage,
        setProduct,
        getAllData,
        getProduct,
        deleteProduct,
      }}
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
