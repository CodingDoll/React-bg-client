import { Modal, Form, Tree } from "antd";
import React, { useState } from "react";
import { menuList } from "../../config/menuConfig";

export default function UpdateRoleModal(props) {
  const { role, visible, onUpdateRole, onCancel } = props;
  const [values, setValues] = useState(role.menus);

  const onCheck = (checkedKeys) => {
    console.log(values);
    setValues([...checkedKeys]);
  };

  // useEffect(() => setValues(role.menus), [role]);

  return (
    <Modal
      visible={visible}
      title="设置角色权限"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => onUpdateRole(values)}
    >
      <Form>
        <Form.Item label="角色名称">
          <span className="ant-form-text">{role.name}</span>
        </Form.Item>
      </Form>
      <Tree
        checkable
        defaultExpandAll={true}
        checkedKeys={values}
        onCheck={onCheck}
        treeData={menuList}
      />
    </Modal>
  );
}
