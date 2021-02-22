import { Modal, Input, Form } from "antd";
import React from "react";

export default function AddRoleModal(props) {
  const { visible, onAddRole, onCancel } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="添加角色"
      okText="添加"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onAddRole(values);
          })
          .catch((info) => {
            console.log("fail", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="add_form_in_modal">
        <Form.Item
          name="roleName"
          label="角色名称"
          rules={[{ required: true, message: "请输入" }]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
