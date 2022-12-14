import React, { Component } from "react";
import axios from "axios";
import authHeader from "../authHeader";
class Comment extends Component {
  state = { data: [{}] };
  async componentDidMount() {
    let result = await axios.get(`http://localhost:4000/member/comment`, {
      headers: authHeader(),
    });
    this.state.data = result.data;
    this.setState({});
  }
  render() {
    return (
      <>
        <div
          style={{ backgroundColor: "rgb(56, 65, 73)" }}
          className="text-center  mt-3 p-2 rounded-2"
        >
          <span className="fs-3">最近評論</span>
        </div>
        <div className="p-3 p-lg-5 box1 ">
          {this.state.data.map((val) => {
            return (
              <div
                key={Math.random()}
                className="row border align-items-center p-3 rounded-2 mb-3"
              >
                <h6>{val.comment}</h6>
                <div className="comSpan">
                  <span>{val.gameName}</span>
                  <span className="float-end">評論日期:{val.commentTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Comment;
