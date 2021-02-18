import { Modal, Input, Select, Form } from "antd";
import React from "react";

const { Option } = Select;

export default function AddCategoryModal(props) {
  const { visible, onAddCategory, onCancel, categories, parentId } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="添加分类"
      okText="添加"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onAddCategory(values);
          })
          .catch((info) => {
            console.log("fail", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="add_form_in_modal">
        {parentId !== "0" ? (
          <></>
        ) : (
          <Form.Item name="parentId" initialValue="0" label="所属分类">
            <Select>
              <Option key="0" value="0">
                一级分类
              </Option>
              {categories.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item name="categoryName" label="分类名称">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
