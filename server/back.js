const express = require("express");
const app = express.Router();
const db = require("./db");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// 儲存檔案的設定
const upload = multer({
  storage: storage,
});
app.get("/", (req, res) => {
  db.conn("SELECT * FROM `member`", [], (rows, err) => {
    res.send(rows);
  });
});
// 取得商品
app.get("/peripheralinfo", (req, res) => {
  db.conn(
    `SELECT * FROM peripheralinfo JOIN peripheralinfopic on peripheralinfo.peripheralId = peripheralinfopic.peripheralId GROUP by peripheralinfo.peripheralId ORDER BY peripheralinfo.peripheraldate DESC`,
    [],
    (rows, err) => {
      res.send(rows);
    }
  );
});
// 取得商品規格
app.get("/peripheralformat:id", (req, res) => {
  db.conn(
    "SELECT * FROM `peripheralformat` WHERE peripheralId =?",
    [req.params.id],
    (rows, err) => {
      res.send(rows);
    }
  );
});
// 商品新增規格
app.post("/commoditydata:id", (req, res, next) => {
  let data = req.body[0];
  db.conn(
    `INSERT into peripheralinfo(peripheralId,peripheralName,peripheralClass,peripheralBrand,peripheralText)VALUES(?,?,?,?,?)`,
    [
      req.params.id,
      data.peripheralName,
      data.peripheralClass,
      data.peripheralBrand,
      data.peripheralText,
    ],
    (rows) => {
      res.send("成功");
    }
  );
});
//商品圖片
app.post("/commodityImg:id", upload.array("addFile", 10), (req, res, next) => {
  req.files.forEach((val) => {
    val.path = `http://localhost:4000/img/${val.originalname}`;
  });
  for (let i = 0; i < req.files.length; i++) {
    db.conn(
      "INSERT INTO `peripheralinfopic` (`peripheralId`, `peripheralPhotoGroup`, `peripheralDesc`) VALUES (?, ?, ?)",
      [req.params.id, req.files[i].path, "戰鬥畫面"],
      (rowss) => {}
    );
  }
  res.send("成功");
});
// 商品新增
app.post("/format", (req, res) => {
  let data = req.body;
  console.log(data);
  let dataList = data[data.length - 1][0] || "";
  for (let i = 0; i < data.length - 1; i++) {
    if (dataList !== "") {
      for (let temp in dataList) {
        db.conn(
          "INSERT INTO `peripheralformat` (`peripheralPrice`, `peripheralSpec`, `peripheralId`, `Status`, `peripheralCount`, `peripheralSpec2`, `peripheralProduct`, `peripheralProduct2`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data[i].price,
            data[i].formatName,
            data[i].id,
            data[i].status || "",
            data[i].count,
            data[i].formatName2 || "",
            data[i].format,
            dataList[temp] || "",
          ],
          (rows, err) => {
            console.log(err);
          }
        );
      }
    } else {
      console.log("ok");
      db.conn(
        "INSERT INTO `peripheralformat` (`peripheralPrice`, `peripheralSpec`, `peripheralId`, `Status`, `peripheralCount`,  `peripheralProduct` ) VALUES (?, ?, ?, ?, ?, ? )",
        [
          data[i].price,
          data[i].formatName,
          data[i].id,
          data[i].status || "",
          data[i].count,
          data[i].format,
        ],
        (rows, err) => {}
      );
    }
  }
  res.send("OK");
});
//商品編輯
app.get("/edit:id", (req, res) => {
  db.conn(
    "SELECT * FROM `peripheralinfo` join peripheralinfopic on peripheralinfo.peripheralId = peripheralinfopic.peripheralId  WHERE peripheralinfo.peripheralId =?",
    [req.params.id],
    (rows) => {
      res.send(rows);
    }
  );
});
//商品編輯(更改名稱等等)
app.put("/formatedit:id", (req, res) => {
  db.conn(
    "UPDATE `peripheralinfo` SET `peripheralName` = ?, `peripheralText` = ?, `peripheralClass` = ?, `peripheralBrand` = ? WHERE peripheralinfo.peripheralId = ?",
    [
      req.body.peripheralName,
      req.body.peripheralText,
      req.body.peripheralClass,
      req.body.peripheralBrand,
      req.params.id,
    ],
    (rows) => {
      res.send(rows);
    }
  );
});
// 商品刪除
app.delete("/delete:pid", (req, res) => {
  db.conn(
    "DELETE FROM peripheralformat WHERE pid=?",
    [req.params.pid],
    (rows) => {
      res.send("ok");
    }
  );
});
// 圖片刪除
app.delete("/imgdelete:photoid", (req, res) => {
  db.conn(
    "DELETE FROM peripheralinfopic WHERE photoId=?",
    [req.params.photoid],
    (rows) => {
      res.send("ok");
    }
  );
});
// 更新規格上架狀態
app.put("/updata:pid", (req, res) => {
  db.conn(
    "UPDATE `peripheralformat` SET Status = ? WHERE peripheralformat.pid = ?",
    [req.body.Status, req.params.pid],
    (rows) => {
      res.send("ok");
    }
  );
});
module.exports = app;
