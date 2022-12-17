import React, { Component } from "react";
import axios from "axios";
import authHeader from "./authHeader";
import swal from "sweetalert";
class Nav extends Component {
  state = { data: [{}] };
  async componentDidMount() {
    const user = localStorage.getItem("token");
    if (user) {
      let result = await axios.get("http://localhost:4000/member/memberinfo", {
        headers: authHeader(),
      });

      if (result) {
        this.setState({ data: result.data[0] });
      }
    }
  }
  logout = async () => {
    let flag = await swal({
      title: "確定要登出嗎?",
      icon: "info",
      buttons: {
        Btn: false,
        cancel: {
          text: "取消",
          visible: true,
        },
        confirm: {
          text: "確定登出",
          visible: true,
        },
      },
      dangerMode: true,
    });
    if (flag) {
      localStorage.removeItem("token");
      window.location = "/";
    }
  };
  login = () => {
    window.location = "/";
  };
  DropDonw = () => {
    var state = document.getElementById("InfoBar").style.display;
    console.log(state);
    if (state === "none") {
      return (document.getElementById("InfoBar").style.display = "block");
    } else {
      return (document.getElementById("InfoBar").style.display = "none");
    }
  };
  render() {
    return (
      <header className="main-head container-fluid px-5 ">
        <div className="">
          <nav className="NavBar row ">
            <div className="logo  col-1 mx-sm-4 ">
              <img src="../img/logo.png" alt="logo" />
            </div>
            <div className="col-11 col-md-8 ">
              <label htmlFor="switch">
                <img src="../img/nav.jpg" alt="nav" />
              </label>
              <input type="checkbox" id="switch" />
              <ul className="menu row">
                <li className="col-md">
                  <img src="../img/shopping-bag.png" alt="bag" />
                  <a href="#">商店</a>
                </li>
                <li className="col-md">
                  <img src="../img/discuss.png" alt="disuss" />
                  <a href="/forum">論壇</a>
                </li>
                <li className="col-md">
                  <img src="../img/qa.png" alt="qa" />
                  <a href="#">協助</a>
                </li>

                <li className="col-md downinfo">
                  <img src="../img/shopping-cart.png" alt="cart" />
                  <a href="/cart">購物車</a>
                </li>
                <li className="col-md downinfo">
                  <img src="../img/member.jpg" alt="" />
                  <a href="/memberinfo">會員中心</a>
                </li>

                <li className="col-md downinfo">
                  <img src="../img/shopping-cart.png" alt="" />
                  <a href="/cart">登出</a>
                </li>
              </ul>
            </div>
            {this.state.data.mail ? (
              <div className="shoppingcart col-1 ">
                <a href="/cart">
                  <img src="../img/shopping-cart.png" alt="cart" />
                </a>
                <div
                  className="MemberInfo col-1 mx-ms-4 "
                  onClick={this.DropDonw}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    src="../img/member.jpg"
                    alt="member"
                  />
                </div>
              </div>
            ) : (
              <div className="col-1 shoppingcart justify-content-end">
                <div>
                  <a href="/">
                    <button className="btn btn-success">登入</button>
                  </a>
                </div>
              </div>
            )}
          </nav>

          <div className="dropdown col-11">
            <ul id="InfoBar" className="row">
              <li className="col-12 ">
                <a href="/memberinfo" className="link">
                  會員中心
                </a>
              </li>
              <li className="col-12 ">
                <a href="#" className="link" onClick={this.logout}>
                  登出
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Nav;
