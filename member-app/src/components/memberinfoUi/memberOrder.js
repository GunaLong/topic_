import React, { Component } from "react";
import axios from "axios";
import authHeader from "../authHeader";
class Order extends Component {
  state = { data: [{}], orderData: [{}] };
  async componentDidMount() {
    let result = await axios.get(`http://localhost:4000/member/order`, {
      headers: authHeader(),
    });
    this.state.data = result.data;
    this.setState({});
  }
  orderData = async (orderid) => {
    console.log(orderid);
    let result = await axios.get(`http://localhost:4000/member/data${orderid}`);
    this.setState({ orderData: result.data });
  };
  render() {
    return (
      <>
        <div
          style={{ backgroundColor: "rgb(56, 65, 73)" }}
          className="text-center  mt-3 p-2 rounded-2"
        >
          <span className="fs-3">訂單資訊</span>
        </div>
        <div className="p-1 p-lg-5 box1">
          {this.state.data.map((val) => {
            return (
              <div key={Math.random()} className=" p-3 rounded-2 mt-2">
                <div className="row p-2">
                  <div className="col-2">
                    <img
                      className="w-100"
                      alt="商品圖"
                      src={val.gamePhoto}
                    ></img>
                  </div>
                  <div className="col-10 ">
                    <h3 className="fs-6">
                      {val.gameName}
                      <span className="float-end fs-6">
                        訂單編號: {val.orderid}
                      </span>
                    </h3>
                    <div className="fs-6">
                      <span>白色</span>
                      <span className="float-end fs-6">X{val.gameCount}</span>
                    </div>
                    <div>
                      <span className="float-end fs-6">${val.gamePrice}</span>
                    </div>
                  </div>
                </div>
                <hr />
                <h3
                  className="fs-6 text-center orderText"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                  onClick={() => {
                    this.orderData(val.orderid);
                  }}
                >
                  訂單詳情
                </h3>
                <hr />
                <div>
                  <span>商品</span>
                  <span className="float-end">訂單金額:{val.orderMoney}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 詳細訂單資訊 */}
        <div className="modal fade" id="exampleModal1" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{ backgroundColor: "rgb(24, 32, 44)" }}
            >
              <div className="modal-body ">
                {this.state.orderData.map((val) => {
                  return (
                    <div
                      key={Math.random()}
                      className="row justify-content-center "
                    >
                      <div className="col-2">
                        <img
                          alt="詳細商品圖"
                          className="w-100"
                          src={val.gamePhoto}
                        ></img>
                      </div>
                      <div className="col-9">
                        <h3>{val.gameName}</h3>
                        <div>
                          <span>白色</span>
                          <span className="float-end">X{val.gameCount}</span>
                        </div>
                        <div>
                          <span className="float-end">${val.gamePrice}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <hr />
                <h6 className="text-end">
                  訂單金額:{this.state.orderData[0].orderMoney}
                </h6>
                <hr />
                <h5>付款方式</h5>
                <span>{this.state.orderData[0].orderDelivery}</span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Order;
