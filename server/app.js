const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//          jsonWebToken套件
const cookieParser = require("cookie-parser");
//    抓前端cookie要的套件
const bcrypt = require("bcrypt");
//          解碼jwt套件
const multer = require("multer");
const fs = require("fs");

const app = express();
app.listen(4000);
console.log("端口4000執行中");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({}));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
  // 要設定網域才有辦法設定cookie
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
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
  res.header("Access-Control-Allow-Credentials", "true");
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

// 註冊路由
app.post("/register", async (req, res) => {
  let data = req.body;
  password = await bcrypt.hash(data[0].password, 12);

  let isflag = true;
  conn.query("SELECT mail FROM `member`", [], (err, rows) => {
    console.log(rows);
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

app.post("/upload_file:cookie", upload.single("myfile"), (req, res) => {
  console.log(req.file);
  req.file.path = `upload/${req.file.originalname}`;
  console.log(req.file.path);
  conn.query("UPDATE member set memberPhoto=? WHERE token=?", [
    req.file.path,
    req.params.cookie,
  ]);
  res.send("上傳成功");
});
