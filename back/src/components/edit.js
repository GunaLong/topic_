import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import formser from "./formser";
import swal from "sweetalert";

function Edit() {
  const urlid = useParams();
  const [Data, setData] = useState([]);
  const [mat, setmat] = useState({});
  const [format, setfomat] = useState([]);
  const [addmat, setaddmat] = useState([]);
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
    }
    let file = document.getElementById("addFile").files;
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("addFile", file[i]);
    }
    try {
      let result1 = await axios.post(
        `http://localhost:4000/back/commodityImg${urlid.data}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    // if (document.querySelector(".form2").reportValidity()) {
    //   let arr = [];
    //   let arr2 = [];
    //   for (let i = 0; i < addmat.length; i++) {
    //     let data = formser(`#status${i}`);
    //     data["id"] = urlid.data;
    //     data["format"] = addmat[i].innerHTML;
    //     data["formatName"] = document.getElementById("formatText").value;
    //     arr.push(data);
    //   }
    //   arr.push(arr2);
    //   let result = await axios.post("http://localhost:4000/back/format", arr);
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
      alert("刪除成功");
      window.location.reload();
    }
  };
  //刪除圖片
  const deleteimg = async (photoId) => {
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
        alert("刪除成功");
        window.location.reload();
      } catch (err) {
        alert(err);
      }
    }
  };
  // 更新上架狀態
  const changeStatus = async (e, pid) => {
    if (e.target.checked) {
      let result = await axios.put(`http://localhost:4000/back/updata${pid}`, {
        Status: "on",
      });
    } else {
      let result = await axios.put(`http://localhost:4000/back/updata${pid}`, {
        Status: "",
      });
    }
  };
  // 預覽圖
  const image = (e) => {
    let file = e.target.files;
    let args = Array.from(file);
    args.forEach((val, i) => {
      let img = document.createElement("img");
      let _url = window.URL.createObjectURL(args[i]);
      img.className = "imgStyle";
      img.src = _url;
      document.getElementById("imgBox2").appendChild(img);
    });
  };
  //新增規格
  const format1 = (e) => {
    if (e.key === "Enter") {
      let p = document.createElement("span");
      p.innerHTML = document.querySelector(".textFromat").value || "請輸入規格";
      p.className = "badge bg-success me-2 p-1 textSpan";
      document.querySelector(".format").appendChild(p);
      document.querySelector(".textFromat").value = "";
      let span = document.querySelectorAll(".badge");
      for (let i = 0; i < span.length; i++) {
        span[i].addEventListener("click", (e) => {
          e.target.remove();
        });
      }
      setaddmat(Array.from(span));
    }
  };
  return (
    <div className="col-10 offset-2 ">
      <form className="form">
        <h4>商品圖片</h4>
        <div id="imgBox" className="d-flex flex-wrap">
          <div id="imgBox2" className="d-flex ">
            {Data.map((val) => {
              return (
                <div key={Math.random()} className="border me-3 text-center">
                  <img
                    alt="商品圖片"
                    className="w-100 imgStyle"
                    src={val.peripheralPhotoGroup}
                  ></img>
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
        <hr />
        <div className="textBox">
          <div className="d-flex justify-content-between">
            <span className="fs-4">商品名稱</span>
            <input
              type="text"
              name="peripheralName"
              className="form-control w-25"
              defaultValue={mat.peripheralName}
              required
            />
            <span className="fs-4">商品分類</span>
            <input
              type="text"
              name="peripheralClass"
              className="form-control w-25"
              defaultValue={mat.peripheralClass}
              required
            />
            <span className="fs-4">商品品牌</span>
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
        <hr />
      </form>
      <h4>商品規格</h4>
      {format.map((val) => {
        return (
          <div key={Math.random()} className="row border m-3 p-2 rounded-2 ">
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
              className="col-1 text-end"
              onClick={() => {
                deletemat(val.pid);
              }}
            >
              <img
                className="w-25 p-1 border"
                src="https://cdn.discordapp.com/attachments/400275387919368192/1049601198862368818/bin.png"
              ></img>
            </div>
          </div>
        );
      })}
      <hr />
      <h4>新增規格</h4>
      <form className="form2">
        <div className="d-flex m-3">
          <input
            type="text"
            className="form-control w-25"
            name="format"
            id="formatText"
            required
          />
          {/* 規格一 */}
          <label
            htmlFor="textFromat"
            className="form-control d-flex w-50 ms-3 "
          >
            <div className="format"></div>
            <input
              type="text"
              placeholder="請輸入規格"
              className="w-50 textFromat"
              name="textFromat"
              onKeyPress={format1}
            />
          </label>
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              <th>規格</th>
              <th>售價</th>
              <th>特價</th>
              <th>數量</th>
            </tr>
          </thead>
          <tbody>
            {addmat.map((val, i) => {
              return (
                <tr key={Math.random()}>
                  <td>{val.innerHTML}</td>
                  <td>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      id={"status" + i}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="coupon"
                      className="form-control"
                      id={"status" + i}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="count"
                      className="form-control"
                      id={"status" + i}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
      <button onClick={submit}>123</button>
    </div>
  );
}
export default Edit;
