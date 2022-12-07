import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
class Dashboard extends Component {
  state = {
    data: {
      labels: ["01", "02", "03", "04", "05", "06", "07"],
      datasets: [
        {
          label: ["銷售金額(萬)"],
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    dbData: [{}],
  };
  async componentDidMount() {
    let result = await axios.get("http://localhost:4000/back");
    this.state.dbData = result.data;

    this.state.data.datasets[0].data = [11, 1, 33, 44, 55, 66, 77];
    this.setState({});
  }
  render() {
    return (
      <>
        <div className="col-10 offset-2 text-center">
          <div>
            <Bar data={this.state.data} />
          </div>
          <hr />
          <table className="table table-hover">
            <thead>
              <tr>
                <th>會員編號</th>
                <th>會員暱稱</th>
                <th>會員信箱</th>
                <th>會員電話</th>
                <th>會員地址</th>
                <th>會員登入狀態</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dbData.map((val) => {
                return (
                  <tr key={Math.random()}>
                    <td>{val.uid}</td>
                    <td>{val.nickname}</td>
                    <td>{val.mail}</td>
                    <td>{val.account}</td>
                    <td>{val.address}</td>
                    <td>{val.token ? "登入中" : "未登入"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Dashboard;
