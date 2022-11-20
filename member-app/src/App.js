import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Nav from "./components/nav";
import Main from "./components/main.js";
import Register from "./components/register";
import MemberInfo from "./components/memberInfo";
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" component={Main} exact></Route>
          <Route path="/register" component={Register} exact></Route>
          <Route path="/memberinfo" component={MemberInfo} exact></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
