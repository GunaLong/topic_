import { Alert } from "bootstrap";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../src/style.css";
import Axios from "axios";

class Main extends Component {
  state = {
    data: [],
  };
  userClick() {
    let labelstyle = document.querySelector(".userId");
    labelstyle.style.top = "-35px";
    labelstyle.style.left = "-10px";
    labelstyle.style.color = "rgb(181, 196, 206)";
    labelstyle.style.fontSize = "12px";
  }
  userPassword() {
    let labelstyle1 = document.querySelector(".userPassword");
    labelstyle1.style.top = "-35px";
    labelstyle1.style.left = "-10px";
    labelstyle1.style.color = "rgb(181, 196, 206)";
    labelstyle1.style.fontSize = "12px";
  }
  //登入判斷
  login = async () => {
    console.log(document.getElementById("form"));
    if (document.getElementById("form").reportValidity()) {
      let userId = document.getElementById("userId");
      let userPassword = document.getElementById("userPassword");
      let result = await Axios.get("http://localhost:4000/");
      this.state.data = result.data;
      let isflag = false;
      this.state.data.forEach((val, i) => {
        if (userId.value == val.mail && userPassword.value == val.password) {
          isflag = true;
        }
      });
      if (isflag) {
        window.location = "/register";
        alert("登入成功");
      } else {
        alert("帳號密碼輸入錯誤");
      }
    } else {
      alert("請輸入帳號密碼");
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-12 col-lg-5 d-flex align-middle  clo">
          <div className="m-auto">
            <div class="login-form">
              <form id="form">
                <div className="login-info">
                  <input
                    type="text"
                    className="border border-3 rounded-2"
                    id="userId"
                    onClick={this.userClick}
                    required
                  ></input>
                  <label
                    className="userId"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      padding: "10px 10px",
                      fontSize: "16px",
                      color: "rgb(15, 20, 25)",
                      pointerEvents: "none",
                      transition: "0.5s",
                    }}
                  >
                    帳號:
                  </label>
                </div>

                <div className="login-info">
                  <input
                    type="text"
                    className="border border-3 rounded-2"
                    id="userPassword"
                    onClick={this.userPassword}
                    required
                  ></input>
                  <label
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      padding: "10px 10px",
                      fontSize: "16px",
                      color: "rgb(15, 20, 25)",
                      pointerEvents: "none",
                      transition: "0.5s",
                    }}
                    className="userPassword"
                  >
                    密碼:
                  </label>
                </div>
              </form>
              <div className="d-flex justify-content-between">
                <NavLink to="/register" className="link">
                  註冊
                </NavLink>
                <a href="#" className="link">
                  忘記密碼
                </a>
              </div>
              <br />
              <div className="d-flex justify-content-center">
                <button className="btn btn-success w-100" onClick={this.login}>
                  登入
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
