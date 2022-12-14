import React, { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Indexitem from "./indexItem";
class Dashboard extends Component {
  state = {
    data: {
      labels: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      datasets: [
        {
          label: ["銷售金額(萬)"],
          data: [0, 59, 80, 81, 56, 55, 40, 10, 10, 10, 10, 10],
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
  };
  async componentDidMount() {
    let rows = await axios.get("http://localhost:4000/back/sum");
    let data = [];
    rows.data.forEach((val) => {
      data.push(val.m);
    });

    this.setState({
      data: {
        labels: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        datasets: [
          {
            label: ["銷售金額(萬)"],
            data: data,
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
    });
  }
  render() {
    return (
      <>
        <div className="col-10 offset-2 text-center bg-light">
          <Bar data={this.state.data} />
          <hr />
          <div className="row justify-content-around container mb-5">
            <Indexitem title="使用者總數" img="../img/team.png" text="353" />
            <Indexitem title="最新周邊" img="../img/trolley.png" text="ps5" />
            <Indexitem
              title="最熱遊戲"
              img="../img/console.png"
              text="艾爾登法環"
            />
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
