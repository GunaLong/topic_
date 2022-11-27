import React, { Component } from "react";
import axios from "axios";
class Nav extends Component {
  state = { data: [{}] };
  async componentDidMount() {
    let data = { cookie: document.cookie.slice(6) };
    let result = await axios.post(
      "http://localhost:4000/member/memberinfo",
      data
    );
    if (result.data[0].token !== "") {
      this.state.data = result.data[0];
      this.setState({});
    }
  }
  logout = async () => {
    axios
      .post(`http://localhost:4000/member/logout${document.cookie.slice(6)}`)
      .then((res) => {
        console.log(res);
        alert("登出成功");
        window.location = "/";
      });
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
            <button className="btn btn-outline-success">登入</button>
          )}
        </div>
      </nav>
    );
  }
}

export default Nav;
