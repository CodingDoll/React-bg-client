import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./index.less";
import { Menu } from "antd";
import { menuList } from "../../config/menuConfig";
import { withRouter } from "react-router-dom";

const { SubMenu } = Menu;

class LeftNav extends Component {
  // getMenuNodes = (list) => {
  //   return list.map((item) => {
  //     if (!item.children) {
  //       return (
  //         <Menu.Item key={item.key} icon={item.icon}>
  //           <Link to={item.key}>{item.title}</Link>
  //         </Menu.Item>
  //       );
  //     } else {
  //       return (
  //         <SubMenu key={item.key} icon={item.icon} title={item.title}>
  //           {this.getMenuNodes(item.children)}
  //         </SubMenu>
  //       );
  //     }
  //   });
  // };

  getMenuNodes = (menuList) => {
    const path = this.props.history.location.pathname;
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        //查找一个与当前请求路径匹配的子item
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
        if (cItem) {
          this.openKey = item.key;
        }
        pre.push(
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };

  menuNodes = this.getMenuNodes(menuList);

  render() {
    let path = this.props.history.location.pathname;
    if (path.indexOf("/product") === 0) {
      path = "/product";
    }
    return (
      <div className="left-nav">
        <Link to="/">
          <header className="left-nav-header">
            <img src={logo} alt="logo" />
            <h1>Doll</h1>
          </header>
        </Link>

        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
