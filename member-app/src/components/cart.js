import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./product";
import authHeader from "./authHeader";
import formser from "./formser";
import swal from "sweetalert";
const Cart = () => {
  const [row, setrow] = useState([]);
  const [total, setTotal] = useState(1);
  const [data, setdata] = useState();

  const asyncFn = async () => {
    let rows = await axios.get("http://localhost:4000/member/cart", {
      headers: authHeader(),
    });
    let result = await axios.get("http://localhost:4000/member/memberinfo", {
      headers: authHeader(),
    });
    let x = 0;
    rows.data.forEach((val) => {
      x += parseInt(val.peripheralPrice * val.count);
    });
    setrow(rows.data);
    setdata(result.data[0]);
    setTotal(x);
  };
  useEffect(() => {
    asyncFn();
  }, []);
  const calculate = (price, i) => {
    const newRow = [...row];
    newRow[i].count += 1;
    let y = newRow[i].peripheralPrice * newRow[i].count;
    newRow[i]["total"] = y;
    setrow(newRow);
    setTotal(total + price); // totalCash =  totalCash + price
  };
  const reduce = (price, i) => {
    const newRow = [...row];
    newRow[i].count -= 1;
    let y = newRow[i].peripheralPrice * newRow[i].count;
    newRow[i]["total"] = y;
    setrow(newRow);
    setTotal(total + price);
  };
  const send = async () => {
    let num = Math.floor(Math.random() * 1000000);
    let obj = formser("form1");
    obj["total"] = total;
    await axios.post(`http://localhost:4000/member/orderget${num}`, obj);
    let result = await axios.post(
      `http://localhost:4000/member/orderformat${num}`,
      row
    );
    await axios.post(`http://localhost:4000/member/orderdelete`, row);
    if (result) {
      let flag = await swal("送出成功", "", "success", {
        buttons: "確定",
      });
      if (flag) {
        window.location = "/memberinfo";
      }
    }
  };
  return (
    <div
      style={{ marginTop: "80PX", marginBottom: "80px" }}
      className="container "
    >
      <div className="row">
        <div className="col-12  cartStyle p-4 ">
          <h1>訂單明細</h1>
          <div className="row p-2 m-0 cartTop text-center rounded-top">
            <div className="col-12  col-lg-4">品名</div>
            <div className="col-2 d-none d-lg-block">規格</div>
            <div className="col-2 d-none d-lg-block">單價</div>
            <div className="col-2 d-none d-lg-block">數量</div>
            <div className="col-1 d-none d-lg-block">小計</div>
            <div className="col-1 d-none d-lg-block"></div>
          </div>
          <div className=" p-3  ">
            {row.map((val, i) => {
              console.log(row);
              return (
                <Product
                  key={i}
                  index={i}
                  price={val.peripheralPrice}
                  count={val.count}
                  name={val.peripheralName}
                  photo={val.peripheralPhoto}
                  peripheralId={val.peripheralId}
                  product={val.peripheralProduct}
                  product2={val.peripheralProduct2}
                  onCalculate={calculate}
                  onReduce={reduce}
                />
              );
            })}
            <h4 className="text-end p-4">
              總計:<span className="fs-1 ">{total}</span>
            </h4>
          </div>
          <div className="row p-lg-5 p-3 m-0 mt-3 border">
            <div className="col-12 col-lg-6">
              <form id="form1">
                <h3 className="mb-4">收件人資訊</h3>
                <div className="row">
                  <div className="col-12 mb-3 d-flex align-items-center justify-content-between ">
                    <span>姓名:</span>
                    <input
                      type="text"
                      name="orderName"
                      className="form-control w-75 ms-4 "
                    />
                  </div>
                  <div className="col-12  mb-3  d-flex align-items-center justify-content-between ">
                    <span>手機:</span>
                    <input
                      type="text"
                      name="orderPhone"
                      className="form-control w-75 ms-4"
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12  mb-3  d-flex align-items-center justify-content-between ">
                    <span>地址:</span>
                    <input
                      type="text"
                      name="orderAddress"
                      className="form-control w-75 ms-4"
                    />
                  </div>
                  <div className="col-12  mb-3  d-flex align-items-center justify-content-between ">
                    <span>Email:</span>
                    <input
                      type="text"
                      name="email"
                      className="form-control w-75 ms-4"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <h3 className="mb-4">付款方式</h3>
              <div>
                <input
                  className="form-check-input me-2"
                  type="radio"
                  defaultChecked
                  disabled
                />
                <span>貨到付款</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <button className="btn btn-success" onClick={send}>
              送出訂單
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
