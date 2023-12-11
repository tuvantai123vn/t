import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Footer from "./Share/Footer/Footer";
import Header from "./Share/Header/Header";
import Home from "./Home/Home";
import Detail from "./Detail/Detail";
import Cart from "./Cart/Cart";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Checkout from "./Checkout/Checkout";
import History from "./History/MainHistory";
import DetailHistory from "./History/DetailHistory";
import Shop from "./Shop/Shop";
import Chat from "./Share/Chat/Chat";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");
  const decodedToken = token ? jwtDecode(token) : {};
  const {userId} = decodedToken

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element= {<Home/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/history" element={<History/>}/>
          <Route path="/history/:id" element={<DetailHistory/>}/>
          <Route path="/shop" element={<Shop/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
