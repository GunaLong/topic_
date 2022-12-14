import React, { Component } from "react";
import axios from "axios";
import authHeader from "../authHeader";
class Game extends Component {
  state = { data: [{}] };
  async componentDidMount() {
    let result = await axios.get(`http://localhost:4000/member/game`, {
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
          <span className="fs-3">我的遊戲庫</span>
        </div>
        <div className="p-1  box1">
          <div className="row justify-content-center">
            {this.state.data.map((val) => {
              return (
                <div key={Math.random()} className="col-6 col-lg-3 gameCard ">
                  <div className="overlay d-flex align-items-end justify-content-center">
                    <span className="fs-5 fs-6">
                      {val.gameName} <br />
                      {val.gameTime}
                    </span>
                  </div>
                  <img
                    alt="遊戲圖片"
                    src={
                      val.gamePhoto ||
                      "https://dummyimage.com/600x400/4f314f/303ac9"
                    }
                    className="h-100 w-100"
                  ></img>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Game;
