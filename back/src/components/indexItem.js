import React, { Component } from "react";
class Indexitem extends Component {
  state = {};
  render() {
    return (
      <div className="col-3 border p-3 shadow-sm  item">
        <h5>{this.props.title}</h5>
        <div className="d-flex justify-content-center">
          <img className="w-25" alt="user" src={this.props.img}></img>
        </div>
        <div className="d-flex justify-content-center">
          <b className="mt-3">{this.props.text}</b>
        </div>
      </div>
    );
  }
}

export default Indexitem;
