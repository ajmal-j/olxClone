import {
  UserCredential,
  UserInfo,
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
  user: UserInfo | User;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: (setCurrentUser: React.SetStateAction<any>) => void;
  logIn: (email: string, password: string) => Promise<UserCredential>;
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
    imageUrl: string,
    description: string
  ): Promise<unknown>;
  getDetails(id: string): Promise<unknown>;
  uploadImage(image: Blob): Promise<string | null>;
  getAllData(): Promise<[]>;
  getProduct(id: string): Promise<any>;
  deleteProduct(id: string): void;
};
type User = {
  uid: string | null;
};
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | UserInfo>({ uid: null });

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut(setCurrentUser: React.SetStateAction<any>) {
    return signOut(auth)
      .then(() => {
        setUser({ uid: null });
        setCurrentUser(undefined);
        toast.success("Successfully loggedOut", {
          id: "logOut",
        });
        navigate("/signIn");
      })
      .catch((error) => {
        console.error(error);
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
    imageUrl: string,
    description: string
  ): Promise<void> {
    return setDoc(doc(db, "products", id), {
      name,
      price,
      category,
      imageUrl,
      userId,
      description,
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
      return null;
    }
  }

  async function getProduct(id: string) {
    try {
      const snapshot = await getDoc(doc(db, "products", id));
      const data = snapshot.data();
      return data;
    } catch (error) {
      console.error("Error while getting product", error);
      return null;
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
      return null;
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
      toast.success("Deleted");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
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

export function UserAuth(): AuthContextValue {
  const context = useContext<AuthContextValue | undefined>(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
