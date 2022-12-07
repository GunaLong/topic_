import React, { Component } from "react";
import axios from "axios";
class Backorder extends Component {
  state = { data: [{}] };

  render() {
    return (
      <>
        <div className="col-10 offset-2 text-center">
          <h1>訂單資料</h1>
        </div>
      </>
    );
  }
}

export default Backorder;
