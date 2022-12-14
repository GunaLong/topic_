import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Format from "./format";
import swal from "sweetalert";
class Commodity extends Component {
  state = { data: [], search: { search: "" } };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/back/peripheralinfo");
    this.setState({ data: result.data });
  }
  alldelete = async (pid) => {
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
      await axios.delete(`http://localhost:4000/back/alldelete${pid}`);
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
      `http://localhost:4000/back/search`,
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
            placeholder="請輸入周邊名稱"
            onChange={(e) => {
              this.state.search.search = e.target.value;
            }}
          />
          <button className="m-2 btn btn-success fs-5" onClick={this.search}>
            搜尋
          </button>
        </div>
        <div className="text-start">
          <Link to="/newproduct" className="float-end btn btn-success">
            新增周邊
          </Link>
        </div>
        <h3 className="text-success">周邊列表</h3>
        <div className="text-start commodity p-3 mt-4 shadow">
          <div className="row justify-content-between text-success">
            <div className="col-1">
              <span>周邊編號</span>
            </div>
            <div className="col-2">
              <span>周邊名稱</span>
            </div>
            <div className="col-3">
              <span>周邊介紹</span>
            </div>
            <div className="col-1">
              <span>周邊類型</span>
            </div>
            <div className="col-1">
              <span>周邊出版商</span>
            </div>
            <div className="col-1">
              <span>周邊讚數</span>
            </div>
            <div className="col-1 ">
              <span>上架時間</span>
            </div>
            <div
              style={{ height: "20px" }}
              className="col-2 d-flex justify-content-around"
            >
              <span>折扣</span>
              <span>編輯</span>
              <span>刪除</span>
            </div>
          </div>
          <hr />
          {this.state.data.map((val, i) => {
            return (
              <div key={Math.random()}>
                <div className="row justify-content-between align-items-center ">
                  <div className="col-1">
                    <span>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#flush-collapseOne" + i}
                          >
                            {val.peripheralId}
                          </button>
                        </h2>
                      </div>
                    </span>
                  </div>
                  <div className="col-2">
                    <span>{val.peripheralName}</span>
                  </div>
                  <div className="col-3">
                    <span>{val.peripheralText}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.peripheralClass}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.peripheralBrand}</span>
                  </div>
                  <div className="col-1">
                    <span>{val.peripheralGood}</span>
                  </div>
                  <div className="col-1">
                    <span style={{ fontSize: "14px" }}>
                      {val.peripheraldate}
                    </span>
                  </div>
                  <div className="col-2 d-flex justify-content-around">
                    <span className="ms-3">{val.peripheralCoupon || 0}</span>
                    <a
                      href={`/edit/${val.peripheralId}`}
                      className="w-25 text-end ms-2"
                    >
                      <img
                        alt="編輯"
                        className="w-50 edit"
                        src="https://cdn.discordapp.com/attachments/400275387919368192/1049209002262806528/editing.png"
                      ></img>
                    </a>
                    <div
                      className="w-25 text-end me-2"
                      onClick={() => {
                        this.alldelete(val.peripheralId);
                      }}
                    >
                      <img
                        alt="刪除"
                        className="w-50 edit"
                        src="https://cdn.discordapp.com/attachments/400275387919368192/1049601198862368818/bin.png"
                      ></img>
                    </div>
                  </div>
                </div>
                <div
                  id={"flush-collapseOne" + i}
                  className="accordion-collapse collapse align-items-center "
                  data-bs-parent="#accordionFlushExample"
                >
                  <Format
                    id={val.peripheralId}
                    key={Math.random()}
                    img={val.peripheralPhotoGroup}
                  />
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Commodity;
