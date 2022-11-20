import React, { Component } from "react";
import axios from "axios";
class MemberEdit extends Component {
  state = {};
  upload = () => {
    console.log(document.getElementById("myfile").files);
    let file = document.getElementById("myfile").files[0];
    const formData = new FormData();
    formData.append("myfile", file);
    axios
      .post(
        `http://localhost:4000/upload_file${document.cookie.slice(6)}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("上傳成功");
        document.getElementById("labText").style.display = "block";
        document.getElementById("fileUpload").style.display = "none";
        document.getElementById("myfile").value = "";
        window.location = "/memberinfo";
      });
  };
  image = (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById("myimg");
    let _url = window.URL.createObjectURL(file);
    console.log(_url);
    preview.src = _url;
    document.getElementById("labText").style.display = "none";
    document.getElementById("fileUpload").style.display = "block";
  };
  cancel = () => {
    document.getElementById("labText").style.display = "block";
    document.getElementById("fileUpload").style.display = "none";
    document.getElementById("myimg").src =
      "https://cdn.discordapp.com/attachments/1029313785917349900/1042715024025735189/user02.png";
    document.getElementById("myfile").value = "";
  };
  render() {
    return (
      <div id="info">
        <div className="text-center bg-info mt-3 p-2 rounded-2">
          <span className="fs-3">個人檔案</span>
        </div>
        <div className="p-5 bg-secondary">
          <div className="row">
            <div className="col-3 ">
              <dl className="">
                <dd className="p-2 m-0">個人檔案</dd>
                <dt className="p-2 bg-success">
                  <a href="#123" className="link">
                    變更個人圖示
                  </a>
                </dt>
                <dt className="p-2 bg-success">
                  <a href="#123" className="link">
                    變更個人資料
                  </a>
                </dt>
                <dd className="p-2 m-0">訂單資料</dd>
              </dl>
            </div>
            <div className="col-9 ">
              <div className="row">
                <div className="col-3 w-25 h-25 imgRadius">
                  <img
                    className="w-100"
                    src={"http://localhost:4000/" + this.props.memberPhoto}
                    alt="會員頭像"
                  ></img>
                </div>
                <div className="col-3">
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    上傳照片
                  </button>

                  {/* <!-- Modal --> */}
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div
                        class="modal-content"
                        style={{ backgroundColor: "rgb(24, 32, 44)" }}
                      >
                        <div class="modal-body ">
                          <div className="row justify-content-center">
                            <div className="col-4 text-center ">
                              <span>預覽圖</span>
                              <img
                                id="myimg"
                                alt="預覽圖"
                                className="w-100 "
                                src="https://cdn.discordapp.com/attachments/1029313785917349900/1042715024025735189/user02.png"
                              ></img>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={this.cancel}
                          >
                            取消
                          </button>
                          <label id="labText" class="btn btn-primary">
                            <input
                              type="file"
                              name="myfile"
                              id="myfile"
                              style={{ display: "none" }}
                              onChange={this.image}
                            />
                            上傳
                          </label>
                          <input
                            id="fileUpload"
                            style={{ display: "none" }}
                            type="button"
                            className="btn btn-primary"
                            value="確定上傳"
                            data-bs-dismiss="modal"
                            onClick={this.upload}
                          />
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
