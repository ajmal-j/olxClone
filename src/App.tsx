import "./App.css";
import Header from "./components/header";
import Navbar from "./components/header/navbar";
import View from "./components/viewComponent";
import Home from "./pages/homePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/view/:id' element={<View />} />
      </Routes>
    </>
  );
}

export default App;
