import React, { Component } from "react";
import axios from "axios";
import MemberEdit from "./memberinfoUi/memberEdit";
import Order from "./memberinfoUi/memberOrder";
import Game from "./memberinfoUi/memberGame";
import Comment from "./memberinfoUi/memberComment";
import { Routes, Route, Link } from "react-router-dom";
import authHeader from "./authHeader";
class MemberInfo extends Component {
  state = { data: [{}] };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/member/memberinfo", {
      headers: authHeader(),
    });

    if (result.data[0]) {
      this.state.data = result.data[0];
      this.setState({});
    }
  }

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

    document.getElementById("myimg").src =
      "https://cdn.discordapp.com/attachments/1029313785917349900/1042715024025735189/user02.png";
    document.getElementById("myfile").value = "";
  };

  render() {
    return (
      <>
        <div style={{ marginTop: "100px" }} className="container ">
          <div
            className="row mt-3 mb-3 rounded-3 p-3 orderShadow"
            style={{ backgroundColor: "rgb(28,28,29)" }}
          >
            <div className="d-flex d-lg-block col-lg-3 ">
              <div className=" text-center info p-lg-2">
                <Link to="userInfo" className="link row justify-content-center">
                  <img
                    className="w-50"
                    src="https://cdn.discordapp.com/attachments/400275387919368192/1042724579883352094/member-card.png"
                    alt="個人資料"
                  />
                  <span className="fs-2 d-none d-lg-block ">個人資料</span>
                </Link>
              </div>
              <br />
              <div className="text-center info p-lg-2">
                <Link to="order" className="link row justify-content-center">
                  <img
                    className="w-50"
                    src="https://cdn.discordapp.com/attachments/400275387919368192/1042726094069039154/check-list.png"
                    alt="訂單資料"
                  />

                  <span className="fs-2 d-none d-lg-block ">訂單資料</span>
                </Link>
              </div>
              <br />
              <div className="text-center info p-lg-2 ">
                <Link to="game" className="link row justify-content-center">
                  <img
                    className="w-50"
                    src="https://cdn.discordapp.com/attachments/434371723367022592/1042728390169464852/game-control.png"
                    alt="我的遊戲庫"
                  />

                  <span className="fs-2 d-none d-lg-block">我的遊戲庫</span>
                </Link>
              </div>
              <br />
              <div className="text-center info p-lg-2">
                <Link to="comment" className="link row justify-content-center">
                  <img
                    className="w-50"
                    src="https://cdn.discordapp.com/attachments/434371723367022592/1042728829371830333/communications.png"
                    alt="最近評論"
                  />

                  <span className="fs-2 d-none d-lg-block">最近評論</span>
                </Link>
              </div>
            </div>
            <div
              className="col-12 col-lg-9  
            "
            >
              <Routes>
                <Route
                  path="*"
                  element={<MemberEdit data={this.state.data} />}
                ></Route>
                <Route path="/order" element={<Order />}></Route>
                <Route path="/game" element={<Game />}></Route>
                <Route path="/comment" element={<Comment />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MemberInfo;
