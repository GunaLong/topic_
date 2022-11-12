import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./nav";
import Main from "./main.js";
import Register from "./register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" component={Main} exact></Route>
          <Route path="/register" component={Register} exact></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
