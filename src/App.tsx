import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/header";
import Navbar from "./components/header/navbar";
import View from "./components/viewComponent";
import AuthProvider from "./context/authProvider";
import ProductContextProvider from "./context/productContext";
import SignIn from "./pages/authentication/signIn";
import SignUp from "./pages/authentication/signUp";
import CreateProduct from "./pages/createProduct";
import Home from "./pages/homePage";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            // path='/view'
            path='/view/:id'
            element={
              <ProductContextProvider>
                <View />
              </ProductContextProvider>
            }
          />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/createProduct' element={<CreateProduct />} />
        </Routes>
      </AuthProvider>
      <Footer />
      <Toaster position='top-right' reverseOrder={true} />
    </div>
  );
}

export default App;
