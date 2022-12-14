import React, { Component } from "react";
import axios from "axios";
import formser from "./formser";
import Img from "./img";
import swal from "sweetalert";
class Gameadd extends Component {
  state = { data: [], file: [], url: [] };

  // 資料送出
  submit = async () => {
    let random = Math.floor(Math.random() * 1000000);
    let file = document.getElementById("addFile").files;
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("addFile", file[i]);
    }
    try {
      await axios.post(
        `http://localhost:4000/back/gameImg${random}`,
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
      await axios.post(`http://localhost:4000/back/gameadd${random}`, data);
      let text = formser(".gameImgText input");

      let arr = Object.keys(text).map((val) => {
        return text[val];
      });
      await axios.post(`http://localhost:4000/back/gameimgtext${random}`, arr);
      let flag = await swal("上架成功", "", "success", {
        buttons: "確定",
      });
      if (flag) {
        window.location = "/game";
      }
    } else {
      swal("請填寫完整資料", "", "error", {
        buttons: "確定",
      });
    }
  };
  // 圖片預覽
  image = (e) => {
    this.state.file = Array.from(e.target.files);
    if (this.state.file.length < 4) {
      this.state.file.forEach((val, i) => {
        let _url = window.URL.createObjectURL(this.state.file[i]);
        this.state.url.push(_url);
      });
    } else {
      swal("最多只能四張", "", "error", {
        buttons: "確定",
      });
    }
    this.setState({});
  };
  change = () => {};
  render() {
    return (
      <div className="col-10 offset-2  bg-light vh-100">
        <form id="form">
          <div className=" p-4 my-3 m-5 commodity shadow-sm">
            <h4>遊戲圖片</h4>
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
            {this.state.url.map((val, i) => {
              return (
                <div
                  key={Math.random()}
                  className="d-flex align-items-center mb-2 gameImgText"
                >
                  <span className="me-2">圖片{i + 1}敘述:</span>
                  <input
                    type="text"
                    name={"gameImgText" + (i + 1)}
                    className="form-control w-75"
                    required
                  />
                </div>
              );
            })}
          </div>
          <div className="textBox p-4 my-3 m-5  commodity shadow-sm">
            <div className="d-flex justify-content-between">
              <span className="fs-5">遊戲名稱</span>
              <input
                type="text"
                name="gameName"
                className="form-control w-25"
                required
              />
              <span className="fs-5">遊戲分類</span>
              <input
                type="text"
                name="gameClass"
                className="form-control w-25"
                required
              />
              <span className="fs-5">遊戲品牌</span>
              <input
                type="text"
                name="gameDeveloper"
                className="form-control w-25"
                required
              />
            </div>
            <div className="d-flex mt-3 justify-content-between">
              <span className="fs-5 ">遊戲售價</span>
              <input
                type="text"
                name="gamePrice"
                className="form-control w-25 "
                required
              />
              <span className="fs-5">遊戲折扣</span>
              <input
                type="text"
                name="gameCoupon"
                className="form-control w-25 "
                required
              />
              <span className="fs-5">遊戲分級 </span>
              <input
                type="number"
                name="gameClassIfication"
                className="form-control w-25"
                required
              />
            </div>
            <div className="d-flex  align-items-center mt-2">
              <span className="fs-5 me-2">上架狀態</span>
              <div className="form-check form-switch d-inline ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="gameStatus"
                />
              </div>
            </div>
            <hr />
            <h5>遊戲敘述</h5>
            <input
              type="text"
              name="gameText"
              className="form-control w-50"
              required
            ></input>
          </div>
        </form>

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

export default Gameadd;
