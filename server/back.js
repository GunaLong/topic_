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
//會員
app.get("/member", (req, res) => {
  db.conn("SELECT * FROM `member`", [], (rows, err) => {
    res.send(rows);
  });
});
//會員搜尋
app.post("/memberSearch", (req, res) => {
  db.conn(
    `SELECT * FROM  member WHERE  nickname LIKE  '%${req.body.search}%';`,
    [],
    (rows) => {
      res.send(rows);
    }
  );
});
// 取得訂單
app.get("/order", (req, res) => {
  db.conn(`SELECT * FROM orderlist`, [], (rows, err) => {
    res.send(rows);
  });
});
// 取得訂單詳細
app.get("/orderformat:orderid", (req, res) => {
  db.conn(
    `SELECT * FROM paylist where orderid = ?`,
    [req.params.orderid],
    (rows, err) => {
      res.send(rows);
    }
  );
});
// 訂單搜尋
app.post("/orderSearch", (req, res) => {
  db.conn(
    `SELECT * FROM  orderlist WHERE  orderid LIKE  '%${req.body.search}%'`,
    [],
    (rows) => {
      res.send(rows);
    }
  );
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
// 商品(規格)刪除
app.delete("/delete:pid", (req, res) => {
  db.conn(
    "DELETE FROM peripheralformat WHERE pid=?",
    [req.params.pid],
    (rows) => {
      res.send("ok");
    }
  );
});
// 商品刪除
app.delete("/alldelete:pid", (req, res) => {
  db.conn(
    "DELETE FROM peripheralinfo WHERE peripheralId=?",
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
// 商品搜尋
app.post("/search", (req, res) => {
  db.conn(
    `SELECT * FROM  peripheralinfo WHERE  peripheralName LIKE  '%${req.body.search}%'`,
    [],
    (rows) => {
      res.send(rows);
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
// 每月周邊銷售量
app.get("/sum", async (req, res) => {
  let data = [];
  for (let i = 1; i < 13; i++) {
    let x = String(i).padStart(2, "0");
    db.conn(
      `SELECT SUM(orderMoney) AS m FROM orderlist WHERE orderdate LIKE  '%2022-${x}%' GROUP BY orderdate`,
      [],
      (rows) => {
        let rawData = rows;
        let dataNormalized = { ...rawData[0] };
        data.push(dataNormalized);
        if (i === 12) {
          res.send(data);
        }
      }
    );
  }
});
//遊戲資料
app.get("/game", (req, res) => {
  db.conn(
    "SELECT * FROM `gameinfo` JOIN gameinfopic on gameinfo.gameId = gameinfopic.gameId GROUP BY gameinfo.gameId ORDER BY gameinfo.gameIssueDate DESC",
    [],
    (rows) => {
      res.send(rows);
    }
  );
});
//遊戲圖片、敘述
app.get("/gameImg:id", (req, res) => {
  db.conn(
    "SELECT * FROM `gameinfopic`JOIN gameinfopictext on gameinfopic.imgId = gameinfopictext.imgId WHERE gameinfopic.gameId = ?",
    [req.params.id],
    (rows) => {
      res.send(rows);
    }
  );
});
// 編輯遊戲資料
app.get("/gameedit:id", (req, res) => {
  db.conn(
    "SELECT * FROM `gameinfo` WHERE gameId = ?;",
    [req.params.id],
    (rows) => {
      res.send(rows);
    }
  );
});
// 新增遊戲
app.post("/gameadd:id", (req, res) => {
  db.conn(
    "INSERT INTO `gameinfo` (`gameId`, `gameName`, `gameText`, `gamePrice`,  `gameClass`, `gameDeveloper`,  `gameCoupon`, `gameStatus`,`gameClassIfication`) VALUES (?, ?, ?, ?, ?, ?,  ?, ?,?)",
    [
      req.params.id,
      req.body[0].gameName,
      req.body[0].gameText,
      req.body[0].gamePrice,
      req.body[0].gameClass,
      req.body[0].gameDeveloper,
      req.body[0].gameCoupon,
      req.body[0].gameStatus || "",
      req.body[0].gameClassIfication,
    ],
    (rows) => {
      res.send(rows);
    }
  );
});
// 新增遊戲圖片說明
app.post("/gameimgtext:id", (req, res) => {
  console.log(req.params.id);
  for (let i = 0; i < req.body.length; i++) {
    db.conn(
      "INSERT INTO `gameinfopictext` (`gameId`, `gameImgText`) VALUES (?, ?)",
      [req.params.id, req.body[i] || ""],
      (rows) => {}
    );
  }
  res.send("ok");
});
// 新增遊戲圖片
app.post("/gameImg:id", upload.array("addFile", 10), (req, res, next) => {
  req.files.forEach((val) => {
    val.path = `http://localhost:4000/img/${val.originalname}`;
  });
  for (let i = 0; i < req.files.length; i++) {
    db.conn(
      "INSERT INTO `gameinfopic` (`gameId`, `gamePhoto`) VALUES (?, ?)",
      [req.params.id, req.files[i].path],
      (rows) => {}
    );
  }
  res.send("成功");
});
// 遊戲圖片說明
app.get("/gametext:id", (req, res) => {
  db.conn(
    "SELECT * FROM `gameinfopictext` where gameId =?",
    [req.params.id],
    (rows) => {
      res.send(rows);
    }
  );
});
// 遊戲圖片刪除
app.delete("/gameDelete:id", (req, res) => {
  db.conn(
    `DELETE FROM gameinfopic WHERE imgId=?`,
    [req.params.id],
    (rows) => {}
  );
  db.conn(
    `DELETE FROM gameinfopictext WHERE imgId=?`,
    [req.params.id],
    (rows) => {
      res.send("ok");
    }
  );
});
// 遊戲資訊編輯
app.put("/gamechange:id", (req, res) => {
  db.conn(
    "UPDATE `gameinfo` SET `gameName` = ?, `gameText` = ?, `gamePrice` = ?, `gameClass` = ?, `gameDeveloper` = ?, `gameCoupon` = ?, `gameStatus` = ?, `gameClassIfication` = ? WHERE `gameinfo`.`gameId` = ?;",
    [
      req.body.gameName,
      req.body.gameText,
      req.body.gamePrice,
      req.body.gameClass,
      req.body.gameDeveloper,
      req.body.gameCoupon,
      req.body.gameStatus || "",
      req.body.gameClassIfication,
      req.params.id,
    ],
    (rows) => {
      res.send("ok");
    }
  );
});
// 遊戲搜尋
app.post("/gameSearch", (req, res) => {
  db.conn(
    `SELECT * FROM gameinfo JOIN gameinfopic on gameinfo.gameId = gameinfopic.gameId WHERE gameName  LIKE '%${req.body.search}%' GROUP BY gameinfo.gameId;`,
    [],
    (rows) => {
      res.send(rows);
    }
  );
});
//論壇資料
app.get("/forum", (req, res) => {
  db.conn(
    "SELECT member.nickname,member.mail,disc.DiscNum,discpic.DiscPic,disc.DiscHot,disc.DiscName FROM `member` JOIN disc on member.uid = disc.uid JOIN discpic on disc.DiscNum = discpic.DiscNum",
    [],
    (rows) => {
      res.send(rows);
    }
  );
});
//論壇刪除
app.delete("/forumdelete:id", (req, res) => {
  db.conn(`DELETE FROM disc WHERE discNum=?`, [req.params.id], (rows) => {});
  db.conn(`DELETE FROM discpic WHERE discNum=?`, [req.params.id], (rows) => {
    res.send("刪除成功");
  });
});
//新增論壇版圖
app.post("/forumImg:id", upload.array("addFile", 10), (req, res, next) => {
  req.files[0].path = `http://localhost:4000/img/${req.files[0].originalname}`;
  db.conn(
    "INSERT INTO `discpic` (`DiscNum`, `DiscPic`) VALUES (?, ?)",
    [req.params.id, req.files[0].path],
    (rows) => {
      res.send("成功");
    }
  );
});
//新增論壇
app.post("/forumData:id", (req, res) => {
  db.conn(
    `INSERT INTO disc (DiscNum, DiscName,uid) VALUES (?,?,?)`,
    [req.params.id, req.body.discName, req.body.uid],
    (rows) => {
      res.send("ok");
    }
  );
});
// 編輯論壇
app.get("/forumedit:id", (req, res) => {
  db.conn(
    `SELECT member.nickname,member.mail,disc.DiscNum,discpic.DiscPic,disc.DiscHot,disc.DiscName FROM member JOIN disc on member.uid = disc.uid JOIN discpic on disc.DiscNum = discpic.DiscNum WHERE disc.DiscNum = ?`,
    [req.params.id],
    (rows) => {
      res.send(rows);
    }
  );
});
// 更新論談
app.put("/forumUpdata:id", (req, res) => {
  db.conn(
    "UPDATE `disc` SET `DiscName` = ?, `uid` = ? WHERE `disc`.`DiscNum` = ?;",
    [req.body.discName, req.body.uid, req.params.id],
    (rows) => {
      res.send("ok");
    }
  );
});
app.put("/forumImg:id", upload.array("addFile", 10), (req, res) => {
  req.files[0].path = `http://localhost:4000/img/${req.files[0].originalname}`;
  db.conn(
    "UPDATE `discpic` SET `DiscPic` = ? WHERE `discpic`.`DiscNum` = ?",
    [req.files[0].path, req.params.id],
    (rows) => {
      res.send("ok");
    }
  );
});

module.exports = app;
