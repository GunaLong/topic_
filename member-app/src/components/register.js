import React, { Component } from "react";
import "./style.css";
import Axios from "axios";
import formser from "./formser";
import { NavLink } from "react-router-dom";
class Register extends Component {
  state = { data: [{}], code: "" };
  // post資料到server
  register = async () => {
    let form = document.getElementById("form");
    let code = document.getElementById("codeVal");
    // 把使用者輸入的資料序列化再傳到data裡
    this.state.data = Array(formser("form"));
    if (form.reportValidity()) {
      // 判斷使用者有沒有輸入正確資料
      if (code.value !== this.state.code) {
        alert("驗證碼錯誤");
        return;
      }
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      let result = await Axios.post(
        "http://localhost:4000/member/register",
        this.state.data,
        config
      );
      if (result.data === "帳號重複") {
        //result.data是後端send回來的資料
        alert("帳號重複");
        return;
      }
      alert("成功");
      window.location = "/";
    } else {
      alert("請輸入完整資料");
    }
  };
  // 寄送驗證碼
  emailjs = async () => {
    this.state.code = "";
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    let num = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Q",
      "W",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "Z",
      "X",
      "V",
      "N",
      "M",
    ];

    for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * 32);
      this.state.code += num[random];
    }
    var data = {
      service_id: "service_emqvzdq",
      template_id: "template_kjmfnj3",
      user_id: "v--zvmBBJMdx7fndE",
      template_params: {
        to_name: document.getElementById("uid").value,
        from_name: "遊戲平台",
        email: document.getElementById("uid").value,
        num: this.state.code,
      },
    };

    await Axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      JSON.stringify(data),
      config
    )
      .then((e) => {
        alert("成功");
      })
      .catch(() => {
        alert("請輸入信箱");
      });
    document.getElementById("code").innerHTML = "重新發送驗證碼";
    return false;
  };

  render() {
    return (
      <>
        <div className="text-center mb-5"></div>
        <div className="main clo ">
          <div className="container h-100">
            <div className="row h-100 ">
              <div className="col-12 col-lg-5  text-lg-end  d-flex justify-content-lg-end justify-content-center  ">
                <div className="d-flex align-items-center p-lg-3">
                  <span style={{ fontSize: "72px", color: "white" }}>註冊</span>
                  <span style={{ fontSize: "72px", color: "white" }}>資料</span>
                  <div className="border-end h-50 ms-5 d-none d-lg-block  "></div>
                </div>
              </div>
              <div
                className="col-12 col-lg-7  text-center text-lg-start  d-flex justify-content-lg-start justify-content-center align-items-center"
                style={{ color: "white" }}
              >
                <br />
                <form id="form">
                  <label>帳號:</label>
                  <input
                    id="uid"
                    name="email"
                    type="text"
                    className=" rounded-2 m-2"
                    placeholder="請輸入信箱"
                    required
                  ></input>
                  <br />
                  <label>密碼:</label>
                  <input
                    name="password"
                    type="password"
                    className=" rounded-2 m-2"
                    required
                  ></input>
                  <br />
                  <label>電話:</label>
                  <input
                    name="account"
                    type="tel"
                    className=" rounded-2 m-2"
                    required
                  ></input>
                  <br />
                  <label>暱稱:</label>
                  <input
                    name="nickname"
                    type="text"
                    className=" rounded-2 m-2"
                    required
                  ></input>
                  <br />
                  <label>地址:</label>
                  <input
                    name="address"
                    type="text"
                    className=" rounded-2 m-2"
                    required
                  ></input>
                  <br />
                  <label>生日:</label>
                  <input
                    name="birthday"
                    type="date"
                    className=" rounded-2 m-2 ps-5 pe-3 "
                    required
                  ></input>
                  <br />
                  <label>驗證碼:</label>
                  <input
                    type="tel"
                    id="codeVal"
                    className=" rounded-2 m-2  w-25"
                    required
                  ></input>
                  <button
                    id="code"
                    className="btn btn-outline-success"
                    onClick={this.emailjs}
                  >
                    發送驗證碼
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <NavLink to="/" className="btn btn-success me-5 ">
            上一步
          </NavLink>
          <button className="btn btn-success ms-5" onClick={this.register}>
            下一步
          </button>
        </div>
      </>
    );
  }
}

export default Register;
