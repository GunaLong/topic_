import React, { Component } from "react";

class Gameformat extends Component {
  state = { data: [{}], format: [] };

  detailed = (price, count, status) => {
    this.state.format = [price, count, status];
    this.setState({});
  };
  render() {
    return (
      <div className="accordion-body row m-2 border p-2 rounded">
        <div style={{ height: "80px" }} className="col-1 ">
          <img
            alt="預覽圖"
            className="w-100 rounded-2 h-100"
            src={this.props.data.gamePhoto}
          ></img>
        </div>

        <div className="col-2 offset-3 d-flex align-items-center">
          <span>售價:{this.props.data.gamePrice || "免費"}</span>
        </div>

        <div className="col-2 d-flex align-items-center">
          <span>
            上架狀態:{this.props.data.gameStatus ? "上架中" : "未上架"}
          </span>
        </div>
      </div>
    );
  }
}

export default Gameformat;
