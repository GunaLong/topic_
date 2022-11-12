const express = require("express");
const cors = require("cors");
const app = express();
app.listen(4000);
console.log("端口4000執行中");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mysql = require("mysql");
const conn = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
  database: "topic",
});

app.get("/", (req, res) => {
  conn.query("SELECT * FROM `member`", [], (err, rows) => {
    res.send(JSON.stringify(rows));
  });
});

app.post("/register", (req, res) => {
  let data = req.body[0];
  conn.query(
    "insert into member (account, password,nickname,mail,birthday,address) values (?,?,?,?,?,?)",
    [
      data.account,
      data.password,
      data.nickname,
      data.email,
      data.birthday,
      data.address,
    ]
  );
  console.log(data.account);

  res.send(req.password);
});
