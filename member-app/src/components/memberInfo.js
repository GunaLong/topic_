import React, { Children, Component } from "react";
import axios from "axios";

import MemberEdit from "./memberEdit";
class MemberInfo extends Component {
  state = { data: [{}], isToggleOn: false };
  async componentDidMount() {
    let data = { cookie: document.cookie.slice(6) };
    let result = await axios.post("http://localhost:4000/memberinfo", data);
    if (result.data[0].token !== "") {
      this.state.data = result.data[0];
      console.log(this.state.data);
      this.setState({});
    }
  }

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
      <>
        <div className="container">
          <div className="m-lg-5 p-lg-3 m-3">
            {/* <h1>{this.state.data.nickname || "尚未登入"}</h1> */}
            <h1>會員資料</h1>
          </div>
          <div className="row  mb-4">
            <div className="col-2 ms-lg-5 ms-3">
              <img
                className="w-100"
                alt="會員頭像"
                src={"http://localhost:4000/" + this.state.data.memberPhoto}
              ></img>
            </div>
            <div className="col-lg-8 col-12 p-4 d-flex align-items-end">
              <div>
                <span className="fs-3">暱稱: {this.state.data.nickname}</span>
                <br />
                <br />
                <span className="fs-3">信箱: {this.state.data.mail}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-lg-5 justify-content-evenly nav">
            <div
              className="col-3 col-lg-2 text-center info d-flex justify-content-center d-lg-block active"
              data-bs-toggle="tab"
              data-bs-target="#home"
            >
              <img
                className="w-75"
                src="https://cdn.discordapp.com/attachments/400275387919368192/1042724579883352094/member-card.png"
                alt="個人資料"
              />
              <br />
              <br />
              <span className="fs-2 d-none d-lg-block ">個人資料</span>
            </div>
            <div
              className="col-3 col-lg-2 text-center info d-flex justify-content-center d-lg-block"
              data-bs-toggle="tab"
              data-bs-target="#order"
            >
              <img
                className="w-75"
                src="https://cdn.discordapp.com/attachments/400275387919368192/1042726094069039154/check-list.png"
                alt="訂單資料"
              />
              <br />
              <br />
              <span className="fs-2 d-none d-lg-block ">訂單資料</span>
            </div>
            <div
              className="col-3 col-lg-2 text-center info d-flex justify-content-center d-lg-block  "
              data-bs-toggle="tab"
              data-bs-target="#game"
            >
              <img
                className="w-75"
                src="https://cdn.discordapp.com/attachments/434371723367022592/1042728390169464852/game-control.png"
                alt="我的遊戲庫"
              />
              <br />
              <br />

              <span className="fs-2 d-none d-lg-block">我的遊戲庫</span>
            </div>
            <div
              className="col-3 col-lg-2 text-center info d-flex justify-content-center d-lg-block "
              data-bs-toggle="tab"
              data-bs-target="#review"
            >
              <img
                className="w-75"
                src="https://cdn.discordapp.com/attachments/434371723367022592/1042728829371830333/communications.png"
                alt="最近評論"
              />
              <br />
              <br />
              <span className="fs-2 d-none d-lg-block">最近評論</span>
            </div>
          </div>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="home">
              {<MemberEdit memberPhoto={this.state.data.memberPhoto} />}
            </div>
            <div class="tab-pane fade" id="game">
              game
            </div>
            <div class="tab-pane fade" id="order">
              order
            </div>
            <div class="tab-pane fade" id="review">
              review
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </>
    );
  }
}

export default MemberInfo;
