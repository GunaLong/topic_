import React, { Component } from "react";
import axios from "axios";
import Orderformat from "./orderformat";
class Backorder extends Component {
  state = { data: [], search: { search: "" } };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/back/order");
    this.setState({ data: result.data });
  }
  search = async () => {
    let result = await axios.post(
      "http://localhost:4000/back/orderSearch",
      this.state.search
    );
    this.setState({ data: result.data });
  };
  render() {
    return (
      <div className="col-10 offset-2 text-center bg-light vh-100">
        <div className="m-5 fs-3">
          <span className="m-2 text-success">搜尋:</span>
          <input
            type="number"
            className="w-50 p-2 searchInput"
            placeholder="請輸入訂單編號"
            onChange={(e) => {
              this.state.search.search = e.target.value;
            }}
          />
          <button className="m-2 btn btn-success fs-5" onClick={this.search}>
            搜尋
          </button>
        </div>
        <h3 className="text-success mb-4">訂單資料</h3>
        <div className=" p-4 my-3 m-5 commodity shadow-sm">
          <div className="row justify-content-around">
            <div className="col-1">
              <span>會員編號</span>
            </div>
            <div className="col-1">
              <span>訂單編號</span>
            </div>
            <div className="col-1">
              <span>訂單名稱</span>
            </div>
            <div className="col-2">
              <span>訂單地址</span>
            </div>
            <div className="col-1">
              <span>付款方式</span>
            </div>
            <div className="col-1">
              <span>寄送方式</span>
            </div>
            <div className="col-1 ">
              <span>訂單金額</span>
            </div>
          </div>
          <hr />
          {this.state.data.map((val, i) => {
            return (
              <div key={Math.random()}>
                <div className="row justify-content-around align-items-center">
                  <div className="col-1">
                    <span>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#flush-collapseOne" + i}
                          >
                            {val.uid}
                          </button>
                        </h2>
                      </div>
                    </span>
                  </div>
                  <div className="col-1">
                    <span>{val.orderid}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.orderName}</span>
                  </div>
                  <div className="col-2">
                    <span>{val.orderAddress}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.orderPayment}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.orderDelivery}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.orderMoney}</span>
                  </div>
                </div>
                <div
                  id={"flush-collapseOne" + i}
                  className="accordion-collapse collapse align-items-center "
                  data-bs-parent="#accordionFlushExample"
                >
                  <Orderformat id={val.orderid} key={Math.random()} />
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Backorder;
