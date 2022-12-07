import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
class Nav extends Component {
  state = {};
  render() {
    return (
      <div className="col-2 position-relative">
        <div className="vh-100 bg-light position-fixed">
          <ul className="p-1 m-0">
            <Link to="/" className="linkText">
              <li className="fs-3 d-flex align-items-center p-2">
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="https://cdn.discordapp.com/attachments/400275387919368192/1046263873323405322/home.png"
                  alt=""
                />
                <span>儀錶板</span>
              </li>
            </Link>
            <Link to="/backorder" className="linkText">
              <li className="fs-3 d-flex align-items-center p-2">
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="https://cdn.discordapp.com/attachments/434371723367022592/1046271750821920768/check-list.png"
                  alt=""
                />
                <span>訂單</span>
              </li>
            </Link>
            <Link to="" className="linkText">
              <li className="fs-3 d-flex align-items-center p-2">
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="https://cdn.discordapp.com/attachments/434371723367022592/1046271935585210368/member-card.png"
                  alt=""
                />
                <span>會員</span>
              </li>
            </Link>
            <Link to="/commodity" className="linkText">
              <li className="fs-3 d-flex align-items-center p-2">
                <img
                  className="me-2"
                  style={{ width: "25px", height: "25px" }}
                  src="https://cdn.discordapp.com/attachments/434371723367022592/1046272226460180540/cart.png"
                  alt=""
                />
                <span>商品</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
