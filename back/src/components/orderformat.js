import React, { Component } from "react";
import axios from "axios";
class Orderformat extends Component {
  state = { data: [{}], format: [] };
  async componentDidMount() {
    let result = await axios.get(
      `http://localhost:4000/back/orderformat${this.props.id}`
    );

    this.setState({ data: result.data });
  }
  getformat = (price, count) => {
    // this.state.format = [price, count];
    this.setState({ format: [price, count] });
  };
  render() {
    return (
      <div className="accordion-body row m-2 border p-2">
        <div style={{ height: "80px" }} className="col-1 ">
          <img
            className="w-100 rounded-2 h-100"
            src={this.props.img}
            alt="訂單照片"
          ></img>
        </div>
        <div className="col-4 d-flex align-items-center">
          <span>商品名稱:</span>
          {this.state.data.map((val) => {
            return (
              <div
                className="formatBox"
                tabIndex="1"
                key={Math.random()}
                onClick={() => {
                  this.getformat(val.gamePrice, val.gameCount);
                }}
              >
                <span>{val.gameName}</span>
              </div>
            );
          })}
        </div>
        <div className="col-2 d-flex align-items-center">
          <span>售價:{this.state.format[0] || "請點擊規格"}</span>
        </div>
        <div className="col-2 d-flex align-items-center">
          <span>數量:{this.state.format[1] || "請點擊規格"}</span>
        </div>
      </div>
    );
  }
}

export default Orderformat;
