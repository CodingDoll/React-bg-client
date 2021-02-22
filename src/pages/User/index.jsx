import React, { Component } from "react";
import { Button, Card, Table, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/dateUtils";
import { PAGE_SIZE } from "../../utils/constant";
import { reqUsers, reqDeleteUser, reqAddUser, reqUpdateUser } from "../../api";
import AddUpdateModal from "./add-update-modal";

const { confirm } = Modal;
export default class User extends Component {
  state = {
    isShowAddUpdate: false,
    users: [],
    roles: [],
    user: {},
    loading: false,
  };
  user = {};
  roleNames = {};

  columns = [
    { title: "用户名", dataIndex: "username" },
    { title: "手机号码", dataIndex: "phone" },
    { title: "邮箱", dataIndex: "email" },
    {
      title: "角色",
      dataIndex: "role_id",
      render: (role_id) => this.roleNames[role_id],
    },
    { title: "注册时间", dataIndex: "create_time", render: formatDate },
    {
      title: "操作",
      dataIndex: "",
      render: (user) => (
        <span>
          <Button
            type="link"
            style={{ padding: 0, marginRight: 10 }}
            onClick={() => this.showUpdate(user)}
          >
            修改
          </Button>
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={() => this.showConfirm(user)}
          >
            删除
          </Button>
        </span>
      ),
    },
  ];

  showAdd = () => {
    this.user = {};
    this.setState({ isShowAddUpdate: true });
  };

  showUpdate = (user) => {
    this.user = user;
    this.setState({ isShowAddUpdate: true });
  };

  showConfirm = (user) => {
    confirm({
      title: `确认删除${user.username}吗？`,
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk: () => {
        this.deleteUser(user._id);
      },
      onCancel: () => {},
    });
  };

  deleteUser = async (userId) => {
    const result = await reqDeleteUser(userId);
    if (result.status === 0) {
      message.success("删除用户成功");
      this.getUsers();
    }
  };

  getUsers = async () => {
    this.setState({ loading: true });
    const result = await reqUsers();
    if (result.status === 0) {
      const { users, roles } = result.data;

      this.roleNames = this.initRoleNames(roles);
      this.setState({ users, roles, loading: false });
    }
  };

  onAddUser = async (values) => {
    const result = await reqAddUser(values);
    if (result.status === 0) {
      message.success("创建用户成功");
      this.getUsers();
    } else {
      message.error("创建用户失败");
    }
    this.setState({ isShowAddUpdate: false });
  };

  onUpdateUser = async (values) => {
    values = { _id: this.user._id, ...values };
    console.log(values);
    const result = await reqUpdateUser(values);
    if (result.status === 0) {
      message.success("更新用户成功");
      this.getUsers();
    } else {
      message.error("更新用户失败");
    }
    this.setState({ isShowAddUpdate: false });
  };

  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    return roleNames;
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { users, loading, isShowAddUpdate, roles } = this.state;
    const title = (
      <Button type="primary" onClick={this.showAdd}>
        创建用户
      </Button>
    );
    return (
      <Card title={title}>
        <Table
          loading={loading}
          dataSource={users}
          columns={this.columns}
          rowKey="_id"
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        <AddUpdateModal
          visible={isShowAddUpdate}
          roles={roles}
          onAddUser={this.onAddUser}
          user={this.user}
          key={this.user._id}
          onUpdateUser={this.onUpdateUser}
          onCancel={() => this.setState({ isShowAddUpdate: false })}
        />
      </Card>
    );
  }
}
