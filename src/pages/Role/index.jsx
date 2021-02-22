import React, { Component } from "react";
import { Card, Button, Table, message } from "antd";

import { reqAddRole, reqRoles, reqUpdateRole } from "../../api/index";
import { PAGE_SIZE } from "../../utils/constant";
import { formatDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

import AddRoleModal from "./add-role-modal";
import UpdateRoleModal from "./update-role-modal";

export default class Role extends Component {
  state = {
    roles: [],
    role: {},
    isShowAdd: false,
    isShowUpdate: false,
  };

  columns = [
    { title: "角色名称", dataIndex: "name" },
    {
      title: "创建时间",
      dataIndex: "create_time",
      render: formatDate,
    },
    {
      title: "授权时间",
      dataIndex: "auth_time",
      render: formatDate,
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
    },
  ];

  onRow = (role) => {
    return {
      onClick: () => {
        this.setState({ role });
      },
    };
  };

  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({ roles });
    }
  };

  onAddRole = async (values) => {
    console.log(values);
    const { roleName } = values;
    const result = await reqAddRole(roleName);
    if (result.status === 0) {
      message.success("添加成功");
      const role = result.data;
      this.setState((state) => ({
        isShowAdd: false,
        roles: [...state.roles, role],
      }));
    }
  };

  onUpdateRole = async (menus) => {
    const { role } = this.state;
    const username = memoryUtils.user.username;
    role.menus = menus;
    role.auth_name = username;
    const result = await reqUpdateRole(role);
    if (result.status === 0) {
      const newData = result.data;
      role.auth_time = newData.auth_time;

      if (role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {};
        storageUtils.removeUser();
        this.props.history.replace("/login");
        message.success("当前角色权限更新了，请重新登录");
      } else {
        message.success("设置角色权限成功");
        this.setState({ isShowUpdate: false, roles: [...this.state.roles] });
      }
    }
  };

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { roles, role, isShowAdd, isShowUpdate } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}
        >
          创建角色
        </Button>
        &nbsp;&nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.setState({ isShowUpdate: true })}
        >
          设置角色权限
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          rowKey="_id"
          columns={this.columns}
          dataSource={roles}
          pagination={{ defaultPageSize: PAGE_SIZE }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: (role) => this.setState({ role }),
          }}
          onRow={this.onRow}
        ></Table>
        <AddRoleModal
          onAddRole={this.onAddRole}
          visible={isShowAdd}
          onCancel={() => this.setState({ isShowAdd: false })}
        />
        <UpdateRoleModal
          key={role._id}
          role={role}
          onUpdateRole={this.onUpdateRole}
          visible={isShowUpdate}
          onCancel={() => this.setState({ isShowUpdate: false })}
        />
      </Card>
    );
  }
}
