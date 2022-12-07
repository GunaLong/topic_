import React, { Component } from "react";
import axios from "axios";
import authHeader from "./authHeader";
import swal from "sweetalert";
class Nav extends Component {
  state = { data: [{}] };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/member/memberinfo", {
      headers: authHeader(),
    });

    if (result) {
      this.state.data = result.data[0];
      this.setState({});
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
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark    ">
        <div className="container-fluid ">
          <a className="navbar-brand" href="#123">
            Navbar
          </a>

          {this.state.data.mail ? (
            <button className="btn btn-outline-success" onClick={this.logout}>
              登出
            </button>
          ) : (
            <button className="btn btn-outline-success" onClick={this.login}>
              登入
            </button>
          )}
        </div>
      </nav>
    );
  }
}

export default Nav;
