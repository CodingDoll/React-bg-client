import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { reqWeather } from "../../api";
import { menuList } from "../../config/menuConfig";
import { formatDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import "./index.less";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import storageUtils from "../../utils/storageUtils";

const { confirm } = Modal;

class Header extends Component {
  state = {
    currentTime: formatDate(Date.now()),
    weather: "",
  };

  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formatDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };

  getWeather = async () => {
    const weather = await reqWeather();
    this.setState({ weather });
  };

  getTitle = () => {
    const path = this.props.history.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find((cItem) => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  logout = () => {
    console.log(this.props);
    confirm({
      title: "你确定要登出吗?",
      icon: <ExclamationCircleOutlined />,
      content: "将回到登录页面",
      onOk: () => {
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      },
    });
  };

  componentDidMount() {
    this.getTime();
    this.getWeather();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { currentTime, weather } = this.state;
    const username = memoryUtils.user.username;
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{username}</span>
          <Button type="link" onClick={this.logout} style={{ padding: "0" }}>
            退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>
              {currentTime} {weather}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
