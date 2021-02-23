import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { menuList } from "../../config/menuConfig";
import { formatDate } from "../../utils/dateUtils";
import { reqWeather } from "../../api";
import "./index.less";
import { logout } from "../../redux/actions";

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
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
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
        this.props.logout();
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
    const { username } = this.props.user;
    // const title = this.getTitle();
    const { headTitle } = this.props;
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{username}</span>
          <Button type="link" onClick={this.logout} style={{ padding: "0" }}>
            退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headTitle}</div>
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
export default connect(
  (state) => ({ headTitle: state.headTitle, user: state.user }),
  { logout }
)(withRouter(Header));
