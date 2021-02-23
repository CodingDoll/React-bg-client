import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";
import LeftNav from "../../components/Left-nav";
import Header from "../../components/Header";

import Home from "../Home";
import Product from "../Product";
import Category from "../Category";
import Role from "../Role";
import User from "../User";
import Bar from "../Charts/Bar";
import Line from "../Charts/Line";
import Pie from "../Charts/Pie";
import NotFound from "../not-found";

const { Sider, Content, Footer } = Layout;

/**
 * 管理页的路由组件
 */

class Admin extends Component {
  render() {
    const user = this.props.user;
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <LeftNav />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header />
          <Content
            style={{
              background: "white",
              margin: "20px 20px",
              overflow: "initial",
            }}
          >
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/product" component={Product} />
              <Route path="/category" component={Category} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Route component={NotFound}></Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#aaa" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect((state) => ({ user: state.user }), {})(Admin);
