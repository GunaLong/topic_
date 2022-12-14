import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Img from "./img";
function Forumedit() {
  let urlid = useParams();
  let [Data, setData] = useState([]);
  let [file, setfile] = useState([]);
  let [info, setinfo] = useState([]);
  let [url, seturl] = useState([]);
  const asyncFn = async () => {
    let result = await axios.get(
      `http://localhost:4000/back/forumedit${urlid.data}`
    );
    let row = await axios.get("http://localhost:4000/back/member");
    setinfo(row.data);
    setData(result.data);
  };
  useEffect(() => {
    asyncFn();
  }, []);

  const submit = async () => {
    let uid = document.querySelector(".select").value;
    let name = document.querySelector("form input").value;
    let infodata = { discName: name, uid: uid };
    console.log(infodata);
    if (document.getElementById("form").reportValidity()) {
      await axios.put(
        `http://localhost:4000/back/forumUpdata${urlid.data}`,
        infodata
      );
    } else {
      alert("請填寫完整資料");
    }

    let file = document.getElementById("addFile").files;
    const formData = new FormData();
    formData.append("addFile", file[0]);

    try {
      let result1 = await axios.put(
        `http://localhost:4000/back/forumImg${urlid.data}`,
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
      window.location = "/forum";
    }
  };

  const image = (e) => {
    file = Array.from(e.target.files);
    setfile();
    if (url.length < 1) {
      file.forEach((val, i) => {
        let _url = window.URL.createObjectURL(file[i]);
        url.push(_url);
      });
      seturl(Array.from(url));
    } else {
      swal("版圖只能一張喔!", "", "error", {
        buttons: "確定",
      });
    }
  };
  return (
    <div className="col-10 offset-2 bg-light  vh-100">
      <div className="p-4 my-3 m-5 commodity shadow-sm">
        <h4>論壇版圖</h4>
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
                    className="forumImgStyle"
                    src={val.DiscPic}
                  ></img>
                </div>
              );
            })}
            {url.map((val) => {
              return (
                <Img
                  url={val}
                  key={Math.random()}
                  styleClass={"forumImgStyle"}
                />
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
              onChange={image}
            ></input>
          </label>
        </div>
      </div>
      <div className=" p-4 my-3 m-5 commodity shadow-sm">
        <div className="d-flex align-items-center">
          <form id="form" className="d-flex align-items-center">
            <span>論壇名稱:</span>
            <input
              type="text"
              name="discName"
              className="form-control w-50 ms-3 me-3"
              defaultValue={Data[0] ? Data[0].DiscName : ""}
              required
            />
          </form>
          <span className="me-3">版主:</span>
          <select disabled="disabled" className="me-3">
            {Data.map((val) => {
              return (
                <option key={Math.random()} value={val.uid}>
                  {val.nickname}({val.mail})
                </option>
              );
            })}
          </select>
          <select className="select">
            {info.map((val) => {
              return (
                <option key={Math.random()} value={val.uid}>
                  {val.nickname}({val.mail})
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button className=" btn btn-success m-5 float-end" onClick={submit}>
        確定更改
      </button>
    </div>
  );
}

export default Forumedit;
