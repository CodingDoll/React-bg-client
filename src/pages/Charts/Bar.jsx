import React, { Component, Fragment } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";

export default class Bar extends Component {
  getOption = () => {
    return {
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
  };

  render() {
    return (
      <Fragment>
        <Card>
          <Button type="primary">更新</Button>
        </Card>
        <Card title="柱状图一">
          <ReactEcharts option={this.getOption()} />
        </Card>
      </Fragment>
    );
  }
}
