import { Modal, Input, Form } from "antd";
import React from "react";

export default function UpdateCategoryModal(props) {
  const [form] = Form.useForm();
  const { onUpdateCategory, onCancel, category, visible } = props;
  const categoryName = category.name || "";

  form.setFieldsValue({ categoryName });

  return (
    <Modal
      forceRender
      visible={visible}
      title="更新分类"
      okText="更新"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onUpdateCategory(values);
          })
          .catch((info) => {
            console.log("fail", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="update_form_in_modal">
        <Form.Item name="categoryName" label="新的分类名字">
          <Input type="textarea" placeholder="请输入新的名字" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
