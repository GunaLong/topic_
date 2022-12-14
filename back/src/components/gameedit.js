import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import formser from "./formser";
import swal from "sweetalert";
import Img from "./img";

function Gameedit() {
  let urlid = useParams();
  let [Data, setData] = useState([]);
  let [mat, setmat] = useState({});
  let [format, setfomat] = useState([]);
  let [file, setfile] = useState([]);
  let [url, seturl] = useState([]);

  // 載入資料
  const asyncFn = async () => {
    let result = await axios.get(
      `http://localhost:4000/back/gameedit${urlid.data}`
    );
    let row = await axios.get(
      `http://localhost:4000/back/gametext${urlid.data}`
    );
    let rows = await axios.get(
      `http://localhost:4000/back/gameImg${urlid.data}`
    );

    let imgtext = Object.keys(row.data[0]).map((val) => {
      return row.data[0][val];
    });
    let gameimgtext = imgtext.filter((val) => {
      return val;
    });

    setData(rows.data);
    setfomat(gameimgtext);
    setmat(result.data[0]);
  };
  // 生命週期
  useEffect(() => {
    asyncFn();
  }, []);
  // 更新資料
  const submit = async () => {
    if (document.querySelector(".form").reportValidity()) {
      await axios.put(
        `http://localhost:4000/back/gamechange${urlid.data}`,
        formser(".form input")
      );
      let text = formser(".gameText input");
      let arr = Object.keys(text).map((val) => {
        return text[val];
      });
      await axios.post(
        `http://localhost:4000/back/gameimgtext${urlid.data}`,
        arr
      );
    } else {
      alert("請填寫完整資料");
    }

    let file = document.getElementById("addFile").files;
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("addFile", file[i]);
    }
    try {
      let result1 = await axios.post(
        `http://localhost:4000/back/gameImg${urlid.data}`,
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
    let flag = await swal("更改成功", "", "success", {
      buttons: "確定",
    });
    if (flag) {
      window.location = "/game";
    }
  };

  //刪除圖片
  const deleteimg = async (imgId) => {
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
        await axios.delete(`http://localhost:4000/back/gameDelete${imgId}`);
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
    file = Array.from(e.target.files);
    setfile();
    if (url.length < 4 - Data.length || file < 4 - Data.length) {
      file.forEach((val, i) => {
        let _url = window.URL.createObjectURL(file[i]);
        url.push(_url);
      });
      seturl(Array.from(url));
    } else {
      swal("最多只能四張", "", "error", {
        buttons: "確定",
      });
    }
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
                      className=" imgStyle"
                      src={val.gamePhoto}
                    ></img>
                    <br />
                    <span
                      className="m-1 btn btn-outline-success"
                      onClick={() => {
                        deleteimg(val.imgId);
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

          {Data.map((val, i) => {
            return (
              <div
                key={Math.random()}
                className="d-flex align-items-center mb-2 gameImgText"
              >
                <span className="me-2">圖片{i + 1}敘述:</span>
                <input
                  type="text"
                  name={"gameImgText" + (i + 1)}
                  className="form-control w-75"
                  defaultValue={val.gameImgText}
                  disabled
                  required
                />
              </div>
            );
          })}
          <div className="gameText">
            {url.map((val, i, arr) => {
              let x = arr.length;
              console.log(x);
              return (
                <div
                  key={Math.random()}
                  className="d-flex align-items-center mb-2 gameImgText"
                >
                  <span className="me-2">
                    圖片
                    {Data.length + (i + 1)}
                    敘述:
                  </span>
                  <input
                    type="text"
                    name={"gameImgText" + (Data.length + (i + 1))}
                    className="form-control w-75"
                    required
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="textBox p-4 my-3 m-5 commodity shadow-sm">
          <div className="d-flex justify-content-between">
            <span className="fs-5">商品名稱</span>
            <input
              type="text"
              name="gameName"
              className="form-control w-25"
              defaultValue={mat.gameName}
              required
            />
            <span className="fs-5">商品分類</span>
            <input
              type="text"
              name="gameClass"
              className="form-control w-25"
              defaultValue={mat.gameClass}
              required
            />
            <span className="fs-5">商品品牌</span>
            <input
              type="text"
              name="gameDeveloper"
              className="form-control w-25"
              defaultValue={mat.gameDeveloper}
              required
            />
          </div>
          <div className="d-flex mt-3 justify-content-between">
            <span className="fs-5 ">遊戲售價</span>
            <input
              type="text"
              name="gamePrice"
              className="form-control w-25 "
              defaultValue={mat.gamePrice}
              required
            />
            <span className="fs-5">遊戲折扣</span>
            <input
              type="text"
              name="gameCoupon"
              className="form-control w-25 "
              defaultValue={mat.gameCoupon}
              required
            />
            <span className="fs-5">遊戲分級 </span>
            <input
              type="number"
              name="gameClassIfication"
              className="form-control w-25"
              defaultValue={mat.gameClassIfication}
              required
            />
          </div>
          <div className="d-flex  align-items-center mt-2">
            <span className="fs-5 me-2">上架狀態</span>
            <div className="form-check form-switch d-inline ">
              <input
                className="form-check-input"
                type="checkbox"
                name="gameStatus"
                defaultChecked={mat.gameStatus === "on" ? true : false}
              />
            </div>
          </div>
          <hr />
          <h4 className="d-flex">商品敘述</h4>
          <input
            type="text"
            name="gameText"
            className="form-control w-50"
            defaultValue={mat.gameText}
            required
          ></input>
        </div>
      </form>

      <button className="btn btn-success me-5 m-2 float-end" onClick={submit}>
        確定修改
      </button>
    </div>
  );
}
export default Gameedit;
