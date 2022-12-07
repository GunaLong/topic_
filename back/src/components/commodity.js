import React, { Component } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import Format from "./format";
import Edit from "./edit";

class Commodity extends Component {
  state = { data: [{}] };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/back/peripheralinfo");
    this.state.data = result.data;
    this.setState({});
  }
  render() {
    return (
      <div className="col-10 offset-2 text-center">
        <div className="m-5 fs-3">
          <span className="m-2 ">搜尋商品:</span>
          <input type="text" className="w-50 p-2" />
          <button className="m-2 btn btn-outline-success fs-5">搜尋</button>
        </div>
        <div className="text-start">
          <Link to="/newproduct" className="float-end btn btn-outline-success">
            新增商品
          </Link>
        </div>
        <div className="text-start">
          <h3>商品列表</h3>
          <hr />
          <div className="row justify-content-between">
            <div className="col-1">
              <span>商品編號</span>
            </div>
            <div className="col-2">
              <span>商品名稱</span>
            </div>
            <div className="col-4">
              <span>商品介紹</span>
            </div>
            <div className="col-1">
              <span>商品類型</span>
            </div>
            <div className="col-1">
              <span>商品出版商</span>
            </div>
            <div className="col-1">
              <span>上架時間</span>
            </div>
            <div className="col-1 ">
              <span>商品讚數</span>
            </div>
            <div
              style={{ height: "20px" }}
              className="col-1 d-flex justify-content-around"
            >
              <span>折扣</span>
              <span>編輯</span>
            </div>
          </div>
          <hr />
          {this.state.data.map((val, i) => {
            return (
              <div key={Math.random()}>
                <div className="row justify-content-between align-items-center">
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
                            {val.peripheralId}
                          </button>
                        </h2>
                      </div>
                    </span>
                  </div>
                  <div className="col-2">
                    <span>{val.peripheralName}</span>
                  </div>
                  <div className="col-4">
                    <span>{val.peripheralText}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.peripheralClass}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.peripheralBrand}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.peripheraldate}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.peripheralGood}</span>
                  </div>
                  <div className="col-1 d-flex justify-content-around">
                    <span>{val.peripheralCoupon || 0}</span>
                    <a href={`/edit/${val.peripheralId}`} className="w-25">
                      <img
                        className="w-100 edit"
                        src="https://cdn.discordapp.com/attachments/400275387919368192/1049209002262806528/editing.png"
                      ></img>
                    </a>
                  </div>
                </div>
                <div
                  id={"flush-collapseOne" + i}
                  className="accordion-collapse collapse align-items-center "
                  data-bs-parent="#accordionFlushExample"
                >
                  <Format
                    id={val.peripheralId}
                    key={Math.random()}
                    img={val.peripheralPhotoGroup}
                  />
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        ;
      </div>
    );
  }
}

export default Commodity;
