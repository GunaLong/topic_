import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Dashboard from "./components/dashboard";
import Nav from "./components/nav";
import Backorder from "./components/backOrder";
import Commodity from "./components/commodity";
import Newproduct from "./components/newProduct";
import Edit from "./components/edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="row">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/backorder" element={<Backorder />}></Route>
            <Route path="/commodity" element={<Commodity />}></Route>
            <Route path="/newproduct" element={<Newproduct />}></Route>
            <Route path="/edit/:data" element={<Edit />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
