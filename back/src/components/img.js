import React, { Component } from "react";
class Img extends Component {
  state = {};
  render() {
    return (
      <div>
        <img
          alt="預覽圖片"
          src={this.props.url}
          className={this.props.styleClass}
        ></img>
      </div>
    );
  }
}

export default Img;
