import React, { Component } from "react";
import "./index.less";
import logo from "./images/logo.png";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

/**
 * 登录页的路由组件
 */

export default class Login extends Component {
  formRef = React.createRef();

  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  validatePwd = (_, value) => {
    // callback回调有参数即失败带回的信息
    console.log(value);
    if (!value) {
      return Promise.reject("密码必须输入");
    } else if (value.length < 4) {
      return Promise.reject("密码至少4位");
    } else if (value.length > 12) {
      return Promise.reject("密码至多12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject("密码必须是英文、数字或下划线组成");
    }
    return Promise.resolve();
  };

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>Doll</h1>
        </header>
        <section className="login-container">
          <h2>Login</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
            ref={this.formRef}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "请输入用户名" },
                { min: 4, message: "用户名至少4位" },
                { max: 12, message: "用户名至多12位" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名必须是英文、数字或下划线组成",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                { validator: this.validatePwd },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
