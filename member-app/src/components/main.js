import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
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
    Axios.defaults.withCredentials = true;
    // axios預設不能從後端設定cookie要改預設值才可以
    console.log(document.getElementById("form"));
    if (document.getElementById("form").reportValidity()) {
      let data = {
        email: document.getElementById("userId").value,
        password: document.getElementById("userPassword").value,
      };
      console.log(data);
      Axios.post("http://localhost:4000/member/login", data)
        .then((result) => {
          console.log(result);
          alert(result.data.message);
          document.getElementById("userId").value = "";
          document.getElementById("userPassword").value = "";
          window.location = "/memberinfo";
        })
        .catch((err) => {
          alert("帳號密碼錯誤");
        });
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-12  d-flex  clo">
          <div className="m-auto bg-dark p-5">
            <div class="login-form ">
              <form id="form">
                <div className="login-info">
                  <input
                    type="text"
                    className="border border-3 rounded-2"
                    id="userId"
                    onFocus={this.userClick}
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
                      color: "rgb(162, 159, 159)",
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
                    onFocus={this.userPassword}
                    required
                  ></input>
                  <label
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      padding: "10px 10px",
                      fontSize: "16px",
                      color: "rgb(162, 159, 159)",
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
                <a href="#123" className="link">
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
