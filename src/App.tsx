import "./App.css";
import Header from "./components/header";
import Navbar from "./components/header/navbar";
import View from "./components/viewComponent";
import AuthProvider from "./context/authProvider";
import SignIn from "./pages/authentication/signIn";
import SignUp from "./pages/authentication/signUp";
import Home from "./pages/homePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signIn' element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
