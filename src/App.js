import "./App.css";
import Login from "./Component/Login";
import Home from "./Container/Home";
import { Route, Routes } from "react-router-dom";
import Product from "./Component/ProductDetails";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./Component/Navbar";
import Cart from "./Component/Cart";
import Category from "./Component/Category";
import Search from "./Component/Search";
import Footer from "./Component/Footer";
import Success from "./Component/Success";
import Cancel from "./Component/Cancel";
import {loadStripe} from '@stripe/stripe-js'
import UserProfile from "./Component/UserProfile";
import { useState } from "react";

// import Stripe from "./api/stripe";

function App() {


  const [democheck, setdemocheck] = useState(false)
  return (
    <Provider store={store}>
  <div className="App">
    <Navbar democheck={democheck} setdemocheck={setdemocheck}/>
    <Routes>
    <Route path="login" element={<Login/>} />
    <Route path="/*" element={<Home/>} />
    <Route path="/:productId" element={<Product/>} />
    <Route path="/cart" element={<Cart setdemocheck={setdemocheck}/>} />
    <Route path="/Category/:categoryId" element={<Category/>} />
    <Route path="/search" element={<Search/>} />
    <Route path="/success" element={<Success/>} />
    <Route path="/cancel" element={<Cancel/>} />
    <Route path="/user-profile/:userId" element={<UserProfile democheck={democheck} setdemocheck={setdemocheck}/>} />
    {/* <Route path="/api/stripe" element={<Stripe/>} /> */}

  </Routes>
<Footer/>
  </div>
  </Provider>
  );
}

export default App;
