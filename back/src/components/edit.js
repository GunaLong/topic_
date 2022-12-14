import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import formser from "./formser";
import swal from "sweetalert";
import Img from "./img";

function Edit() {
  let urlid = useParams();
  let [Data, setData] = useState([]);
  let [mat, setmat] = useState({});
  let [format, setfomat] = useState([]);
  let [file, setfile] = useState([]);
  let [url, seturl] = useState([]);

  // 載入資料
  const asyncFn = async () => {
    let result = await axios.get(
      `http://localhost:4000/back/edit${urlid.data}`
    );
    let rows = await axios.get(
      `http://localhost:4000/back/peripheralformat${urlid.data}`
    );
    setData(result.data);
    setmat(result.data[0]);
    setfomat(rows.data);
  };
  // 生命週期
  useEffect(() => {
    asyncFn();
  }, []);
  // 更新資料
  const submit = async () => {
    if (document.querySelector(".form").reportValidity()) {
      await axios.put(
        `http://localhost:4000/back/formatedit${urlid.data}`,
        formser(".form input")
      );
    } else {
      swal("請填寫完整資料", "", "error", {
        buttons: "確定",
      });
    }
    let file = document.getElementById("addFile").files;
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("addFile", file[i]);
    }

    await axios.post(
      `http://localhost:4000/back/commodityImg${urlid.data}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    let flag = await swal("更改成功", "", "success", {
      buttons: "確定",
    });
    if (flag) {
      window.location = "/commodity";
    }
  };
  // 刪除規格
  const deletemat = async (pid) => {
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
      await axios.delete(`http://localhost:4000/back/delete${pid}`);
      let flag2 = await swal("刪除成功", "", "success", {
        buttons: "確定",
      });
      if (flag2) {
        window.location.reload();
      }
    }
  };
  //刪除圖片
  const deleteimg = async (photoId) => {
    if (Data.length < 2) {
      swal("最少要留一張圖片!!", "", "error", {
        buttons: "確定",
      });
      return;
    }
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
      try {
        await axios.delete(`http://localhost:4000/back/imgdelete${photoId}`);
        let flag2 = await swal("刪除成功", "", "success", {
          buttons: "確定",
        });
        if (flag2) {
          window.location.reload();
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  // 更新上架狀態
  const changeStatus = async (e, pid) => {
    if (e.target.checked) {
      await axios.put(`http://localhost:4000/back/updata${pid}`, {
        Status: "on",
      });
    } else {
      await axios.put(`http://localhost:4000/back/updata${pid}`, {
        Status: "",
      });
    }
  };
  // 預覽圖
  const image = (e) => {
    file = Array.from(e.target.files);
    setfile();
    file.forEach((val, i) => {
      let _url = window.URL.createObjectURL(file[i]);
      url.push(_url);
    });
    seturl(Array.from(url));
  };

  return (
    <div className="col-10 offset-2 bg-light vh-100">
      <form className="form">
        <div className="p-4 my-3 m-5 commodity shadow-sm">
          <h4>商品圖片</h4>
          <div id="imgBox" className="d-flex flex-wrap">
            <div id="imgBox2" className="d-flex ">
              {Data.map((val) => {
                return (
                  <div
                    key={Math.random()}
                    className="border me-3 text-center p-2 rounded"
                  >
                    <img
                      alt="商品圖片"
                      className="imgStyle"
                      src={val.peripheralPhotoGroup}
                    ></img>
                    <br />
                    <span
                      className="m-1 btn btn-outline-success"
                      onClick={() => {
                        deleteimg(val.photoId);
                      }}
                    >
                      刪除
                    </span>
                  </div>
                );
              })}
              {url.map((val) => {
                return (
                  <Img url={val} key={Math.random()} styleClass={"imgStyle"} />
                );
              }) || ""}
            </div>
            <label className="border d-flex justify-content-center align-items-center imgLabel">
              <span>點擊新增圖片</span>
              <input
                className="d-none"
                type="file"
                name="addFile"
                id="addFile"
                multiple="multiple"
                onChange={image}
              ></input>
            </label>
          </div>
        </div>

        <div className="textBox p-4 my-3 m-5 commodity shadow-sm">
          <div className="d-flex justify-content-between">
            <span className="fs-5">商品名稱</span>
            <input
              type="text"
              name="peripheralName"
              className="form-control w-25"
              defaultValue={mat.peripheralName}
              required
            />
            <span className="fs-5">商品分類</span>
            <input
              type="text"
              name="peripheralClass"
              className="form-control w-25"
              defaultValue={mat.peripheralClass}
              required
            />
            <span className="fs-5">商品品牌</span>
            <input
              type="text"
              name="peripheralBrand"
              className="form-control w-25"
              defaultValue={mat.peripheralBrand}
              required
            />
          </div>
          <hr />
          <h4 className="d-flex">商品敘述</h4>
          <input
            type="text"
            name="peripheralText"
            className="form-control w-50"
            defaultValue={mat.peripheralText}
            required
          ></input>
        </div>
      </form>
      <div className="p-4 my-3 m-5 commodity shadow-sm">
        <h5>商品規格</h5>
        {format.map((val) => {
          return (
            <div key={Math.random()} className="row border m-3 p-2 rounded-2  ">
              <div className="col-2 offset-1">
                <div className="d-flex justify-content-center align-items-center">
                  規格:
                  <div className="formatBox ms-2">
                    {val.peripheralProduct}
                    <br />
                    {val.peripheralProduct2}
                  </div>
                </div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <span>售價:</span>
                <input
                  className="form-control w-50 p-1 ms-2"
                  type="text"
                  defaultValue={val.peripheralPrice}
                />
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <span>庫存:</span>
                <input
                  className="form-control w-50 p-1 ms-2"
                  type="text"
                  defaultValue={val.peripheralCount}
                />
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <span>上架狀態:</span>
                <div className="form-check form-switch d-inline-block ms-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="status"
                    defaultChecked={val.Status === "on" ? true : false}
                    onChange={(e) => {
                      changeStatus(e, val.pid);
                    }}
                  />
                </div>
              </div>
              <div
                className="col-1 d-flex align-items-center"
                onClick={() => {
                  deletemat(val.pid);
                }}
              >
                <img
                  alt="刪除"
                  style={{ width: "30px", height: "30px" }}
                  className="  p-1 border"
                  src="https://cdn.discordapp.com/attachments/400275387919368192/1049601198862368818/bin.png"
                ></img>
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn btn-success me-5 m-2 float-end" onClick={submit}>
        確定修改
      </button>
    </div>
  );
}
export default Edit;
