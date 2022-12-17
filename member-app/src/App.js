import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Nav from "./components/nav";
import Main from "./components/main.js";
import Register from "./components/register";
import MemberInfo from "./components/memberInfo";
import Cart from "./components/cart";
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/memberinfo/*" element={<MemberInfo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
