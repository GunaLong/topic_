import React, { Component } from "react";
import axios from "axios";
class Format extends Component {
  state = { data: [{}], format: [] };
  async componentDidMount() {
    let result = await axios.get(
      `http://localhost:4000/back/peripheralformat${this.props.id}`
    );
    this.state.data = result.data;
    this.setState({});
  }

  detailed = (price, count, status) => {
    this.state.format = [price, count, status];
    this.setState({});
  };
  render() {
    return (
      <div className="accordion-body row m-2 border p-2">
        <div style={{ height: "80px" }} className="col-1 ">
          <img className="w-100 rounded-2 h-100" src={this.props.img}></img>
        </div>
        <div className="col-4 d-flex align-items-center">
          <span>規格:</span>
          {this.state.data.map((val) => {
            return (
              <div
                className="formatBox"
                tabIndex="1"
                onClick={() => {
                  this.detailed(
                    val.peripheralPrice,
                    val.peripheralCount,
                    val.Status
                  );
                }}
                key={Math.random()}
              >
                <span>
                  {val.peripheralProduct}
                  <br />
                  {val.peripheralProduct2}
                </span>
              </div>
            );
          })}
        </div>
        <div className="col-2 d-flex align-items-center">
          <span>售價:{this.state.format[0] || "請點擊規格"}</span>
        </div>
        <div className="col-2 d-flex align-items-center">
          <span>庫存:{this.state.format[1] || "請點擊規格"}</span>
        </div>
        <div className="col-2 d-flex align-items-center">
          <span>上架狀態:{this.state.format[2] ? "上架中" : "未上架"}</span>
        </div>
      </div>
    );
  }
}

export default Format;
