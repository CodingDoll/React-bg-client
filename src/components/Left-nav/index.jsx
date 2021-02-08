import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./index.less";
import { Menu } from "antd";
import {
  HomeOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
        <Link to="/">
          <header className="left-nav-header">
            <img src={logo} alt="logo" />
            <h1>Doll</h1>
          </header>
        </Link>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingOutlined />}>
            Home
          </Menu.Item>
          <SubMenu key="sub1" icon={<ShoppingOutlined />} title="Commodity">
            <Menu.Item key="5" icon={<AppstoreOutlined />}>
              Category
            </Menu.Item>
            <Menu.Item key="6" icon={<ShoppingOutlined />}>
              Commodity
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
