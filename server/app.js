const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//    抓前端cookie要的套件

app.listen(4000);
console.log("端口4000執行中");

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({}));
app.use(cors({}));
// 要設定網域才有辦法設定cookie

const member = require("./member");
app.use("/member", member);
const back = require("./back");
app.use("/back", back);
