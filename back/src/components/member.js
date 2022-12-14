import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
class Member extends Component {
  state = { data: [], message: "", search: { search: "" } };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/back/member");

    this.setState({ data: result.data });
  }
  emailjs = async (name, email) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    var data = {
      service_id: "service_emqvzdq",
      template_id: "template_2jusfd4",
      user_id: "v--zvmBBJMdx7fndE",
      template_params: {
        to_name: name,
        from_name: "G-master",
        email: email,
        message: this.state.message,
      },
    };

    await axios
      .post(
        "https://api.emailjs.com/api/v1.0/email/send",
        JSON.stringify(data),
        config
      )
      .then(async (e) => {
        let x = await swal("上架成功", "", "success", {
          buttons: "確定",
        });
        if (x) {
          window.location = "/member";
        }
      });
    return false;
  };
  search = async () => {
    let result = await axios.post(
      "http://localhost:4000/back/memberSearch",
      this.state.search
    );
    this.setState({ data: result.data });
  };
  render() {
    return (
      <div className="col-10 offset-2 text-center bg-light vh-100">
        <div className="m-5 fs-3">
          <span className="m-2 text-success">搜尋:</span>
          <input
            type="text"
            className="w-50 p-2 searchInput"
            placeholder="請輸入會員暱稱"
            onChange={(e) => {
              this.state.search.search = e.target.value;
            }}
          />
          <button className="m-2 btn btn-success fs-5" onClick={this.search}>
            搜尋
          </button>
        </div>
        <h3 className="text-success mb-4">會員管理</h3>
        <div className=" p-4 my-3 m-5 commodity shadow-sm">
          <div className="row justify-content-around">
            <div className="col-1">
              <span>會員編號</span>
            </div>
            <div className="col-2">
              <span>會員信箱</span>
            </div>
            <div className="col-2">
              <span>會員暱稱</span>
            </div>
            <div className="col-1">
              <span>會員電話</span>
            </div>
            <div className="col-2">
              <span>會員地址</span>
            </div>
            <div className="col-2 ">
              <span>會員生日</span>
            </div>
            <div className="col-2 text-start ps-5">
              <span>創建日期</span>
            </div>
          </div>
          <hr />
          {this.state.data.map((val, i) => {
            return (
              <div
                key={Math.random()}
                className="row justify-content-around p-3"
              >
                <div className="col-1">
                  <span>{val.uid}</span>
                </div>
                <div className="col-2">
                  <span>{val.mail}</span>
                </div>
                <div className="col-2">
                  <span>{val.nickname}</span>
                </div>
                <div className="col-1">
                  <span>{val.account}</span>
                </div>
                <div className="col-2">
                  <span>{val.address}</span>
                </div>
                <div className="col-2 ">
                  <span>{val.birthday}</span>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <span>{val.autoDate}</span>
                  <div
                    style={{ width: "50px", height: "30px", cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target={"#exampleModal" + i}
                  >
                    <img
                      className="w-50"
                      alt="warn"
                      src="../img/gmail.png"
                    ></img>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id={"exampleModal" + i}
                  tabIndex="-1"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-body">
                        <h4>請輸入訊息</h4>
                        <textarea
                          rows="4"
                          cols="50"
                          onChange={(e) => {
                            this.state.message = e.target.value;
                          }}
                        ></textarea>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          取消
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            this.emailjs(val.nickname, val.mail);
                          }}
                        >
                          送出
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Member;
