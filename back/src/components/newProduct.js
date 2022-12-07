import React, { Component } from "react";
import axios from "axios";
import formser from "./formser";
class Newproduct extends Component {
  state = { data: [], format: [], format1: [] };

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
      alert("上架成功");
    } else {
      alert("請填入完整資料");
    }
  };
  // 圖片預覽
  image = (e) => {
    let file = e.target.files;
    let args = Array.from(file);
    args.forEach((val, i) => {
      let img = document.createElement("img");
      let _url = window.URL.createObjectURL(args[i]);
      img.className = "imgStyle";
      img.src = _url;
      document.getElementById("imgBox2").appendChild(img);
    });
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
      p.innerHTML =
        document.querySelector(".textFromat1").value || "請輸入規格";
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
      <div className="col-10 offset-2">
        <form id="form">
          <h4>商品圖片</h4>
          <hr />
          <div id="imgBox" className="d-flex ">
            <div id="imgBox2" className="d-flex"></div>
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
          <hr />
          <div className="textBox">
            <div className="d-flex justify-content-between">
              <span className="fs-4">商品名稱</span>
              <input
                type="text"
                name="peripheralName"
                className="form-control w-25"
                required
              />
              <span className="fs-4">商品分類</span>
              <input
                type="text"
                name="peripheralClass"
                className="form-control w-25"
                required
              />
              <span className="fs-4">商品品牌</span>
              <input
                type="text"
                name="peripheralBrand"
                className="form-control w-25"
                required
              />
            </div>
            <hr />
            <h4>商品敘述</h4>
            <input
              type="text"
              name="peripheralText"
              className="form-control w-50"
              required
            ></input>
          </div>

          <hr />
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
        </form>
        <br />
        <button className="btn btn-outline-success" onClick={this.button}>
          點擊新增
        </button>
        <hr />
        <table className="table text-center">
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

        <button className="btn btn-outline-success" onClick={this.submit}>
          確定新增
        </button>
      </div>
    );
  }
}

export default Newproduct;
