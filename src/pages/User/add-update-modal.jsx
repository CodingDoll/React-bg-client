import { Modal, Input, Form, Select } from "antd";
import React from "react";

const { Option } = Select;
export default function AddUpdateModal(props) {
  const { visible, onAddUser, onCancel, roles, user, onUpdateUser } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={!!user._id ? "更新用户" : "创建用户"}
      okText={!!user._id ? "更新" : "创建"}
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            !!user._id ? onUpdateUser(values) : onAddUser(values);
          })
          .catch((info) => {
            console.log("fail", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="add_form_in_modal">
        <Form.Item
          name="username"
          label="用户名"
          initialValue={user.username}
          rules={[{ required: true, message: "请输入" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        {!!user._id ? null : (
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入" }]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
        )}
        <Form.Item
          name="phone"
          label="手机号"
          initialValue={user.phone}
          rules={[{ required: true, message: "请输入" }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          initialValue={user.email}
          rules={[{ required: true, message: "请输入" }]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item
          name="role_id"
          label="角色"
          initialValue={user.role_id}
          rules={[{ required: true, message: "请输入" }]}
        >
          <Select placeholder="请选择角色">
            {roles.map((role) => {
              return (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
