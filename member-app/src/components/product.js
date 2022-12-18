import axios from "axios";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
const Product = ({
  price,
  name,
  photo,
  onCalculate,
  onReduce,
  index,
  count,
  product,
  product2,
  peripheralId,
}) => {
  // const [count, setcount] = useState(1);
  const increment = () => {
    // setcount(count + 1);
    onCalculate(price, index);
  };
  const decrement = () => {
    if (count > 1) {
      // setcount(count - 1);
      onReduce(-price, index);
    }
  };
  const singleDelete = async () => {
    let flag = await swal({
      title: "確定要刪除嗎?",
      icon: "warning",
      buttons: {
        Btn: false,
        cancel: {
          text: "取消",
          visible: true,
        },
        confirm: {
          text: "確定刪除",
          visible: true,
        },
      },
      dangerMode: true,
    });
    if (flag) {
      await axios.delete(
        `http://localhost:4000/member/singleDelete${peripheralId}`
      );
      window.location.reload();
    }
  };
  return (
    <div className="row mb-3 align-items-center p-2 shadow-lg">
      <div className="col-12 col-lg-4">
        <div className="row">
          <div className="col-3">
            <img className="w-100" alt="商品圖片" src={photo} />
          </div>
          <div className="col-9">
            <span>{name}</span>
          </div>
        </div>
      </div>
      <div className="col-2 col-lg-2 text-center">
        {product}
        <br />
        {product2}
      </div>
      <div className="col-2 d-none d-lg-block text-center">NT${price}</div>
      <div className="col-4 col-lg-2 text-center">
        <button
          className="buttomStyle me-2"
          onClick={() => {
            decrement();
          }}
        >
          -
        </button>
        <span>{count}</span>
        <button className="buttomStyle ms-2" onClick={increment}>
          +
        </button>
      </div>
      <div className="col-1 text-center title">NT${price * count}</div>
      <div className="col-1 d-none d-lg-block text-start">
        <span className="link" onClick={singleDelete}>
          刪除
        </span>
      </div>
    </div>
  );
};

// class Product extends Component {
//   state = { count: 3 };
//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//     this.props.onCalculate(this.props.price);
//   };
//   decrement = () => {
//     if (this.state.count > 1) {
//       this.setState({ count: this.state.count - 1 });
//     }
//   };
//   render() {
//     return (
//       <div className="row mb-3 align-items-center">
//         <div className="col-6 ">
//           <div className="row">
//             <div className="col-3">
//               <img
//                 className="w-100"
//                 alt="商品圖片"
//                 src={this.props.value.gamePhoto}
//               />
//             </div>
//             <div className="col-9">
//               <span>{this.props.value.gameName}</span>
//             </div>
//           </div>
//         </div>
//         <div className="col-2 text-center">NT${this.props.price}</div>
//         <div className="col-2 text-center">
//           <button className="buttomStyle me-2" onClick={this.decrement}>
//             -
//           </button>
//           <span>{this.state.count}</span>
//           <button className="buttomStyle ms-2" onClick={this.increment}>
//             +
//           </button>
//         </div>
//         <div className="col-1 text-center title">
//           NT${this.props.price * this.state.count}
//         </div>
//         <div className="col-1  text-start">
//           <span className="link">刪除</span>
//         </div>
//       </div>
//     );
//   }
// }

export default Product;
