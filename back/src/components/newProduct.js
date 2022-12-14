import React, { Component } from "react";
import axios from "axios";
import formser from "./formser";
import Img from "./img";
import swal from "sweetalert";
class Newproduct extends Component {
  state = { data: [], format: [], format1: [], file: [], url: [] };

  // 資料送出
  submit = async () => {
    let random = Math.floor(Math.random() * 1000000);
    let file = document.getElementById("addFile").files;
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("addFile", file[i]);
    }
    try {
      let result1 = await axios.post(
        `http://localhost:4000/back/commodityImg${random}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch {}

    if (document.getElementById("form").reportValidity()) {
      let data = new Array(formser(".textBox input"));
      let rows = await axios.post(
        `http://localhost:4000/back/commoditydata${random}`,
        data
      );

      let arr = [];
      let obj = {};
      let arr2 = [];
      for (let i = 0; i < this.state.format.length; i++) {
        let data = formser(`#status${i}`);
        data["id"] = random;
        data["formatName"] = this.state.data[0];
        data["format"] = this.state.format[i].innerHTML;
        data["formatName2"] = this.state.data[1];
        arr.push(data);
      }

      for (let y = 0; y < this.state.format1.length; y++) {
        obj[`${"formatList" + y}`] = this.state.format1[y].innerHTML;
        arr2.push(obj);
      }

      arr.push(arr2);

      let result = await axios.post("http://localhost:4000/back/format", arr);
      swal("上架成功", "", "success", {
        buttons: "確定",
      });
      window.location = "/commodity";
    } else {
      swal("請填寫完整資料", "", "error", {
        buttons: "確定",
      });
    }
  };
  // 圖片預覽
  image = (e) => {
    if (this.state.file.length < 6) {
      this.state.file = Array.from(e.target.files);
      this.state.file.forEach((val, i) => {
        let _url = window.URL.createObjectURL(this.state.file[i]);
        this.state.url.push(_url);
      });
    } else {
      swal("最多只能六張", "", "error", {
        buttons: "確定",
      });
    }
    this.setState({});
  };
  // 商品規格
  format = (e) => {
    if (e.key === "Enter") {
      let p = document.createElement("span");
      p.innerHTML = document.querySelector(".textFromat").value || "請輸入規格";
      p.className = "badge bg-success me-2 p-1 textSpan";
      document.querySelector(".format").appendChild(p);
      document.querySelector(".textFromat").value = "";
      let span = document.querySelectorAll(".badge");
      for (let i = 0; i < span.length; i++) {
        span[i].addEventListener("click", (e) => {
          e.target.remove();
        });
      }
      this.state.format = Array.from(span);
      this.setState({});
    }
  };
  format1 = (e) => {
    if (e.key === "Enter") {
      let p = document.createElement("span");
      p.innerHTML = document.querySelector(".textFromat1").value;
      p.className = "badge bg-success me-2 p-1 textSpan1";
      document.querySelector(".format1").appendChild(p);
      document.querySelector(".textFromat1").value = "";
      let span = document.querySelectorAll(".textSpan1");
      for (let i = 0; i < span.length; i++) {
        span[i].addEventListener("click", (e) => {
          e.target.remove();
        });
      }
      this.state.format1 = Array.from(span);
      this.setState({});
    }
  };
  button = () => {
    document.getElementById("box").style.display = "flex";
  };
  render() {
    return (
      <div className="col-10 offset-2  bg-light">
        <form id="form">
          <div className=" p-4 my-3 m-5 commodity shadow-sm">
            <h4>商品圖片</h4>
            <div id="imgBox" className="d-flex ">
              <div id="imgBox2" className="d-flex">
                {this.state.url.map((val) => {
                  return (
                    <Img
                      url={val}
                      key={Math.random()}
                      styleClass={"imgStyle"}
                    />
                  );
                })}
              </div>
              <label className="border d-flex justify-content-center align-items-center imgLabel">
                <span>點擊新增圖片</span>
                <input
                  className="d-none"
                  type="file"
                  name="addFile"
                  id="addFile"
                  multiple="multiple"
                  onChange={this.image}
                ></input>
              </label>
            </div>
          </div>
          <div className="textBox p-4 my-3 m-5  commodity shadow-sm">
            <div className="d-flex justify-content-between">
              <span className="fs-5">商品名稱</span>
              <input
                type="text"
                name="peripheralName"
                className="form-control w-25"
                required
              />
              <span className="fs-5">商品分類</span>
              <input
                type="text"
                name="peripheralClass"
                className="form-control w-25"
                required
              />
              <span className="fs-5">商品品牌</span>
              <input
                type="text"
                name="peripheralBrand"
                className="form-control w-25"
                required
              />
            </div>
            <hr />
            <h5>商品敘述</h5>
            <input
              type="text"
              name="peripheralText"
              className="form-control w-50"
              required
            ></input>
          </div>
          <div className="p-4 my-3 m-5 commodity shadow-sm">
            <h4>商品規格</h4>
            <div className="d-flex">
              <input
                type="text"
                className="form-control w-25"
                onChange={(e) => {
                  this.state.data[0] = e.target.value;
                  this.setState({});
                }}
                required
              />
              {/* 規格一 */}
              <label
                htmlFor="textFromat"
                className="form-control d-flex w-50 ms-3 "
              >
                <div className="format"></div>
                <input
                  type="text"
                  placeholder="請輸入規格"
                  className="w-50 textFromat"
                  name="textFromat"
                  onKeyPress={this.format}
                />
              </label>
            </div>

            <br />
            {/* 規格二 */}
            <div style={{ display: "none" }} id="box">
              <input
                type="text"
                className="form-control w-25"
                onChange={(e) => {
                  this.state.data[1] = e.target.value;
                  this.setState({});
                }}
              />
              <label
                htmlFor="textFromat1"
                className="form-control d-flex w-50 ms-3 "
              >
                <div className="format1"></div>
                <input
                  type="text"
                  placeholder="請輸入規格"
                  className="w-50 textFromat1"
                  name="textFromat1"
                  onKeyPress={this.format1}
                />
              </label>
            </div>
            <button className="btn btn-success mt-3" onClick={this.button}>
              點擊新增
            </button>
          </div>
        </form>
        <br />

        <div className="my-3 m-5 commodity shadow-sm">
          <table className="table text-center  ">
            <thead>
              <tr>
                <th>{this.state.data[0] || "規格"}</th>
                <th>售價</th>
                <th>特價</th>
                <th>數量</th>
                <th>上架狀態</th>
              </tr>
            </thead>
            <tbody>
              {this.state.format.map((val, i) => {
                return (
                  <tr>
                    <td>{val.innerHTML}</td>
                    <td>
                      <input
                        type="text"
                        name="price"
                        className="form-control"
                        id={"status" + i}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="coupon"
                        className="form-control"
                        id={"status" + i}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="count"
                        className="form-control"
                        id={"status" + i}
                      />
                    </td>
                    <td>
                      <div className="form-check form-switch d-flex justify-content-center align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="status"
                          id={"status" + i}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          className=" btn btn-success m-5 float-end"
          onClick={this.submit}
        >
          確定新增
        </button>
      </div>
    );
  }
}

export default Newproduct;
