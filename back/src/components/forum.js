import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
class Forum extends Component {
  state = { data: [], search: { search: "" } };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/back/forum");
    this.setState({ data: result.data });
  }
  delete = async (discid) => {
    let flag = await swal({
      title: "確定要刪除嗎?",
      icon: "warning",
      buttons: {
        Btn: false,
        cancel: {
          text: "取消",
          visible: true,
        },
        confirm: {
          text: "確定刪除",
          visible: true,
        },
      },
      dangerMode: true,
    });
    if (flag) {
      await axios.delete(`http://localhost:4000/back/forumdelete${discid}`);
      let flag1 = await swal("刪除成功", "", "success", {
        buttons: "確定",
      });
      if (flag1) {
        window.location.reload();
      }
    }
  };
  search = async () => {
    let result = await axios.post(
      `http://localhost:4000/back/forumSearch`,
      this.state.search
    );

    this.setState({ data: result.data });
  };
  render() {
    return (
      <div className="col-10 offset-2 bg-light text-center vh-100">
        <div className="m-5 fs-3">
          <span className="m-2 text-success">搜尋:</span>
          <input
            type="text"
            className="w-50 p-2 searchInput"
            placeholder="請輸入論壇名稱"
            onChange={(e) => {
              this.setState({ search: { search: e.target.value } });
            }}
          />
          <button className="m-2 btn btn-success fs-5" onClick={this.search}>
            搜尋
          </button>
        </div>
        <div className="text-start">
          <Link to="/forumadd" className="float-end btn btn-success">
            新增論壇
          </Link>
        </div>
        <h3 className="text-success mb-4">論壇管理</h3>
        <div className=" p-4 my-3 m-5 commodity shadow-sm">
          <div className="row justify-content-around">
            <div className="col-2">
              <span>討論區圖片</span>
            </div>
            <div className="col-2">
              <span>討論區編號</span>
            </div>
            <div className="col-2">
              <span>討論區遊戲名稱</span>
            </div>
            <div className="col-1">
              <span>人氣</span>
            </div>
            <div className="col-3">
              <span>版主</span>
            </div>
            <div className="col-1"></div>
          </div>
          <hr />
          {this.state.data.map((val) => {
            return (
              <div
                key={Math.random()}
                className="row justify-content-around align-items-center mb-3"
              >
                <div className="col-2">
                  <img className="w-100" alt="縮圖" src={val.DiscPic}></img>
                </div>
                <div className="col-2">
                  <span>{val.DiscNum}</span>
                </div>
                <div className="col-2">
                  <span>{val.DiscName}</span>
                </div>
                <div className="col-1">
                  <span>{val.DiscHot}</span>
                </div>
                <div className="col-3">
                  <span>
                    {val.nickname}
                    <br />({val.mail})
                  </span>
                </div>
                <div className="col-1 d-flex justify-content-between">
                  <Link
                    to={`/forumedit/${val.DiscNum}`}
                    style={{ width: "22px" }}
                  >
                    <img
                      className="w-100  edit"
                      alt="縮圖"
                      src="../img/editing.png"
                    ></img>
                  </Link>
                  <img
                    className="w-25 edit"
                    alt="縮圖"
                    src="../img/bin.png"
                    onClick={() => {
                      this.delete(val.DiscNum);
                    }}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Forum;
