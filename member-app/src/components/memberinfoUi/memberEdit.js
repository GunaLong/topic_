import React, { Component } from "react";
import axios from "axios";
import formser from "../formser";
import authHeader from "../authHeader";
class MemberEdit extends Component {
  state = {};
  // 更新資料
  upload = async () => {
    console.log(document.getElementById("myfile").files);
    let file = document.getElementById("myfile").files[0];
    if (file) {
      const formData = new FormData();
      formData.append("myfile", file);
      await axios
        .post(`http://localhost:4000/member/upload_file`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          document.getElementById("labText").style.display = "block";
          document.getElementById("myfile").value = "";
          alert("圖片上傳成功");
        })
        .catch(() => {
          alert("照片上傳失敗");
        });
    }
    let data = Array(formser("form"));
    let form = document.getElementById("form");
    if (form.reportValidity()) {
      await axios
        .put(`http://localhost:4000/member/upload_data`, data, {
          headers: authHeader(),
        })
        .then((res) => {
          console.log(res);
          alert("更新成功");
          window.location = "/memberinfo";
        })
        .catch(() => {
          alert("更新失敗");
        });
    } else {
      alert("請輸入完整資料");
    }
  };
  // 顯示預覽圖
  image = (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById("myimg");
    let _url = window.URL.createObjectURL(file);
    console.log(_url);
    preview.src = _url;
    document.getElementById("labText").style.display = "none";
  };
  // 取消重製
  cancel = () => {
    document.getElementById("labText").style.display = "block";
    document.getElementById("myimg").src =
      this.props.data.memberPhoto ||
      "https://cdn.discordapp.com/attachments/1029313785917349900/1042715024025735189/user02.png";
    document.getElementById("myfile").value = "";
    document.querySelectorAll("#form input").forEach((val) => {
      val.value = "";
    });
  };

  render() {
    return (
      <div>
        <div
          style={{ backgroundColor: "rgb(56, 65, 73)" }}
          className="text-center  mt-3 p-2 rounded-2"
        >
          <span className="fs-3">個人檔案</span>
        </div>
        <div className="p-2 box1 p-lg-5">
          <div className="row">
            <div className="col-12 ">
              <div className="row ">
                <div
                  className="col-6 col-lg-2   "
                  style={{
                    width: "20vmax",
                    height: "20vmax",
                    overflow: "hidden",
                    objectFit: "cover",
                  }}
                >
                  <img
                    className="w-100 h-100 rounded-2"
                    src={
                      this.props.data.memberPhoto ||
                      "https://cdn.discordapp.com/attachments/1029313785917349900/1042715024025735189/user02.png"
                    }
                    alt="會員頭像"
                  ></img>
                </div>
                <div className="col-lg-6 col-12 m-auto">
                  {/* <!-- Button trigger modal --> */}
                  <table className="table fs-6 fs-5">
                    <tbody>
                      <tr>
                        <th>暱稱</th>
                        <td>{this.props.data.nickname}</td>
                      </tr>
                      <tr>
                        <th>連絡電話</th>
                        <td>{this.props.data.account}</td>
                      </tr>
                      <tr>
                        <th>出生日期</th>
                        <td>{this.props.data.birthday}</td>
                      </tr>
                      <tr>
                        <th>通訊地址</th>
                        <td>{this.props.data.address}</td>
                      </tr>
                      <tr>
                        <th>信箱</th>
                        <td>{this.props.data.mail}</td>
                      </tr>
                    </tbody>
                  </table>

                  <button
                    type="button"
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    編輯個人資訊
                  </button>
                  {/* <!-- Modal --> */}
                  <div className="modal fade" id="exampleModal" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                      <div
                        className="modal-content"
                        style={{ backgroundColor: "rgba(24, 32, 44,0.9)" }}
                      >
                        <div className="modal-body ">
                          <div className="row justify-content-start">
                            <div className="col-4 text-center ">
                              <img
                                id="myimg"
                                alt="預覽圖"
                                className="w-100 "
                                src={
                                  this.props.data.memberPhoto ||
                                  "https://cdn.discordapp.com/attachments/1029313785917349900/1042715024025735189/user02.png"
                                }
                              ></img>
                            </div>
                            <div className="col-8 ">
                              <label
                                id="labText"
                                className="btn btn-outline-success"
                              >
                                <input
                                  type="file"
                                  name="myfile"
                                  id="myfile"
                                  style={{ display: "none" }}
                                  onChange={this.image}
                                />
                                上傳
                              </label>
                            </div>
                          </div>
                          <div className="row ">
                            <form id="form">
                              <table className="table ">
                                <tbody className="fs-5">
                                  <tr className="p-3 ">
                                    <th scope="row">暱稱</th>
                                    <td>
                                      <input
                                        name="nickname"
                                        className="bg-dark m-0"
                                        type="text"
                                        required
                                      ></input>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>連絡電話</th>
                                    <td>
                                      <input
                                        name="account"
                                        className="bg-dark m-0"
                                        type="text"
                                        required
                                      ></input>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>出生日期</th>
                                    <td>
                                      <input
                                        name="birthday"
                                        className="bg-dark m-0"
                                        type="date"
                                        required
                                      ></input>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>通訊地址</th>
                                    <td>
                                      <input
                                        name="address"
                                        className="bg-dark m-0"
                                        type="text"
                                        required
                                      ></input>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </form>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center ">
                          <button
                            type="button"
                            className="btn btn-outline-secondary me-3"
                            data-bs-dismiss="modal"
                            onClick={this.cancel}
                          >
                            取消
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={this.upload}
                          >
                            確定
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberEdit;
