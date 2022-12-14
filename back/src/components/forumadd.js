import React, { Component } from "react";
import axios from "axios";
import formser from "./formser";
import Img from "./img";
import swal from "sweetalert";
class Forumadd extends Component {
  state = { data: [], file: [], url: [], info: { discName: "", uid: "" } };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/back/member");
    this.setState({ data: result.data });
  }
  submit = async () => {
    let random = Math.floor(Math.random() * 1000000);
    let file = document.getElementById("addFile").files;
    const formData = new FormData();
    formData.append("addFile", file[0]);
    try {
      await axios.post(
        `http://localhost:4000/back/forumImg${random}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch {}
    let uid = document.querySelector("select").value;
    let name = document.querySelector("form input").value;
    let info = { discName: name, uid: uid };
    if (document.getElementById("form").reportValidity()) {
      await axios.post(`http://localhost:4000/back//forumData${random}`, info);
      let flag = await swal("上架成功", "", "success", {
        buttons: "確定",
      });
      if (flag) {
        window.location = "/forum";
      }
    } else {
      swal("請填寫完整資料", "", "error", {
        buttons: "確定",
      });
    }
  };
  image = (e) => {
    this.state.file = Array.from(e.target.files);
    if (this.state.url.length < 1) {
      this.state.file.forEach((val, i) => {
        let _url = window.URL.createObjectURL(this.state.file[i]);
        this.state.url.push(_url);
      });
    } else {
      swal("版圖只能一張喔!", "", "error", {
        buttons: "確定",
      });
    }
    this.setState({});
  };
  render() {
    return (
      <div className="col-10 offset-2  bg-light vh-100">
        <div className=" p-4 my-3 m-5 commodity shadow-sm">
          <h4>論壇版圖</h4>
          <div id="imgBox" className="d-flex ">
            <div id="imgBox2" className="d-flex">
              {this.state.url.map((val) => {
                return (
                  <Img
                    url={val}
                    key={Math.random()}
                    styleClass={"forumImgStyle"}
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
                onChange={this.image}
              ></input>
            </label>
          </div>
        </div>
        <div className=" p-4 my-3 m-5 commodity shadow-sm">
          <div className="d-flex align-items-center">
            <form id="form" className="d-flex align-items-center">
              <span>論壇名稱:</span>
              <input
                type="text"
                name="discName"
                className="form-control w-50 ms-3 me-3"
                required
              />
            </form>
            <span className="me-3">版主:</span>
            <select>
              {this.state.data.map((val) => {
                return (
                  <option key={Math.random()} value={val.uid}>
                    {val.nickname}({val.mail})
                  </option>
                );
              })}
            </select>
          </div>
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

export default Forumadd;
