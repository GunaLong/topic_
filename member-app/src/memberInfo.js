import React, { Component } from "react";
import axios, { Axios } from "axios";
class MemberInfo extends Component {
  state = {};
  async componentDidMount() {
    let data = { cookie: document.cookie.slice(6) };
    let result = await axios.post("http://localhost:4000/memberinfo", data);
  }

  render() {
    return (
      <>
        <h1>會員頁面</h1>
        <button onClick={this.X}> 點</button>
      </>
    );
  }
}

export default MemberInfo;
