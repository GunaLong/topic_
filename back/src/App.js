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
import Game from "./components/game";
import Gameadd from "./components/gameadd";
import Gameedit from "./components/gameedit";
import Member from "./components/member";
import Forum from "./components/forum";
import Forumadd from "./components/forumadd";
import Forumedit from "./components/forumedit";
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="row ">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/backorder" element={<Backorder />}></Route>
            <Route path="/commodity" element={<Commodity />}></Route>
            <Route path="/member" element={<Member />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/gameadd" element={<Gameadd />}></Route>
            <Route path="/gameedit/:data" element={<Gameedit />}></Route>
            <Route path="/newproduct" element={<Newproduct />}></Route>
            <Route path="/edit/:data" element={<Edit />}></Route>
            <Route path="/forum" element={<Forum />}></Route>
            <Route path="/forumadd" element={<Forumadd />}></Route>
            <Route path="/forumedit/:data" element={<Forumedit />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
