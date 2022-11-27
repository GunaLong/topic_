const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
//          jsonWebToken套件
const bcrypt = require("bcrypt");
//          解碼jwt套件
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// 儲存檔案的設定
const upload = multer({
  storage: storage,
});
const mysql = require("mysql");
const conn = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
  database: "topic",
  dateStrings: true,
});
// 登入驗證函式
const login = (data) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM `member` where mail=?",
      [data.email],
      (error, rows) => {
        if (error) {
          resolve("帳號密碼錯誤");
        }
        bcrypt.compare(data.password, rows[0].password).then((res) => {
          if (res) {
            const payload = {
              user_id: rows[0].uid,
              user_name: rows[0].nickname,
              user_mail: rows[0].mail,
            };
            const token = jwt.sign(
              { payload, exp: Math.floor(Date.now() / 1000) + 60 * 15 },
              "my_secret_key"
            );

            resolve(
              Object.assign({ code: 200 }, { message: "登入成功", token })
            );
          } else {
            resolve("帳號密碼錯誤");
          }
        });
      }
    );
  });
};
// 登入驗證函式end

//登入路由
app.post("/login", async (req, res) => {
  const data = req.body;
  login(data).then((result) => {
    conn.query("UPDATE member set token=? WHERE mail=?", [
      result.token,
      data.email,
    ]);
    res.cookie("token", result.token, {
      maxAge: Math.floor(Date.now() / 1000) + 60 * 15,
    });
    res.send(result);
  });
});
//登出

app.post("/logout:cookie", (req, res) => {
  const data = req.params.cookie;
  conn.query('UPDATE member set token="" WHERE token=?', [data], (err) => {
    res.send("已登出");
  });
});
// 註冊路由
app.post("/register", async (req, res) => {
  let data = req.body;
  password = await bcrypt.hash(data[0].password, 12);
  let isflag = true;
  conn.query("SELECT mail FROM `member`", [], (err, rows) => {
    rows.forEach((val) => {
      if (val.mail == data[0].email) {
        isflag = false;
      }
    });
    if (isflag) {
      conn.query(
        "insert into member (account, password,nickname,mail,birthday,address) values (?,?,?,?,?,?)",
        [
          data[0].account,
          password,
          data[0].nickname,
          data[0].email,
          data[0].birthday,
          data[0].address,
        ]
      );
      res.send("註冊成功");
    } else {
      res.send("帳號重複");
    }
  });
});

// 會員資訊頁
app.post("/memberinfo", (req, res) => {
  conn.query(
    "SELECT * FROM `member` where token=?",
    [req.body.cookie],
    (err, rows) => {
      res.send(rows);
    }
  );
});
// 訂單資料
app.get("/order:cookie", (req, res) => {
  conn.query(
    "SELECT orderlist.orderid,orderdate,orderPhone,orderAddress,orderDelivery,orderMoney,gamePhoto,gameName,gamePrice,gameCount,token FROM member JOIN orderlist on member.uid = orderlist.uid  JOIN paylist on orderlist.orderid = paylist.orderid WHERE token = ? GROUP BY orderlist.orderid",
    [req.params.cookie],
    (err, rows) => {
      res.send(rows);
    }
  );
});
// 訂單詳細資料;
app.get("/data:orderid", (req, res) => {
  conn.query(
    "SELECT orderlist.orderid,orderdate,orderPhone,orderAddress,orderDelivery,orderMoney,gamePhoto,gameName,gamePrice,gameCount,token FROM member JOIN orderlist on member.uid = orderlist.uid  JOIN paylist on orderlist.orderid = paylist.orderid WHERE  orderlist.orderid = ?;",
    [req.params.orderid],
    (err, rows) => {
      res.send(rows);
    }
  );
});
//上傳圖片
app.post("/upload_file:cookie", upload.single("myfile"), (req, res) => {
  req.file.path = `http://localhost:4000/upload/${req.file.originalname}`;
  conn.query(
    "UPDATE member set memberPhoto=? WHERE token=?",
    [req.file.path, req.params.cookie],
    (err, result) => {
      res.send("上傳成功");
    }
  );
});

//更新個人資料
app.put("/upload_data:cookie", (req, res) => {
  let data = req.body;
  conn.query(
    "UPDATE member set nickname=?, account=? ,birthday=?,address=?  WHERE token = ?",
    [
      data[0].nickname,
      data[0].account,
      data[0].birthday,
      data[0].address,
      req.params.cookie,
    ],
    (err) => {
      console.log(err);
      res.send("err");
    }
  );
});
// 遊戲庫呈現
app.get("/game:cookie", (req, res) => {
  conn.query(
    "SELECT gameName,gamePhoto,gameClass,token,gameTime FROM member JOIN gamelibrary on member.uid = gamelibrary.uid JOIN gameinfo on gameinfo.gameId = gamelibrary.gameid where token=? AND gameClass != '周邊'",
    [req.params.cookie],
    (err, rows) => {
      res.send(rows);
    }
  );
});
// 遊戲區評論
app.get("/comment:cookie", (req, res) => {
  conn.query(
    "SELECT gameName,comment,commentTime ,token FROM `member` JOIN comment on member.uid = comment.uid JOIN gameinfo on comment.gameid = gameinfo.gameId where token =?",
    [req.params.cookie],
    (err, rows) => {
      res.send(rows);
    }
  );
});

module.exports = app;
