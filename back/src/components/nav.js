import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  state = {};
  render() {
    return (
      <div className="col-2 position-relative">
        <div className="vh-100 navbg position-fixed">
          <Link to="/" className="linkText ">
            <div className="fs-3 d-flex align-items-center  p-2 ps-4 navtop">
              <img
                className="me-2"
                style={{ width: "25px", height: "25px" }}
                src="../img/back-arrow.png"
                alt=""
              />
              <span>返回主選單</span>
            </div>
          </Link>
          <ul className="p-1 m-0 mt-3 ">
            <Link to="/backorder" className="linkText">
              <li
                className="fs-3 d-flex align-items-center p-2 ps-4 ms-1 mb-2"
                tabIndex="1"
              >
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="../img/check-list.png"
                  alt=""
                />
                <span>訂單管理</span>
              </li>
            </Link>
            <Link to="/member" className="linkText">
              <li
                className="fs-3 d-flex align-items-center p-2 ps-4 ms-1 mb-2"
                tabIndex="1"
              >
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="../img/membercard.png"
                  alt=""
                />
                <span>會員管理</span>
              </li>
            </Link>
            <Link to="/commodity" className="linkText">
              <li
                className="fs-3 d-flex align-items-center p-2 ps-4 ms-1 mb-2"
                tabIndex="1"
              >
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="../img/cart.png"
                  alt=""
                />
                <span>周邊管理</span>
              </li>
            </Link>
            <Link to="/game" className="linkText">
              <li
                className="fs-3 d-flex align-items-center p-2 ps-4 ms-1 mb-2"
                tabIndex="1"
              >
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="../img/games.png"
                  alt=""
                />
                <span>遊戲管理</span>
              </li>
            </Link>
            <Link to="/forum" className="linkText">
              <li
                className="fs-3 d-flex align-items-center p-2 ps-4 ms-1"
                tabIndex="1"
              >
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="../img/bubble-chat.png"
                  alt=""
                />
                <span>論壇管理</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
