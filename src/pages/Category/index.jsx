import React, { Component, Fragment } from "react";
// antd 组件
import { Button, Card, message, Table } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
// api
import { reqCategories, reqAddCategory, reqUpdateCategory } from "../../api";

import AddCategoryModal from "./add-category-modal";
import UpdateCategoryModal from "./update-category-modal";

export default class Category extends Component {
  state = {
    loading: true,
    categories: [],
    parentId: "0",
    parentName: "类名",
    showStatus: 0, //标识添加/更新的确认框是否显示，0:都不显示，1:添加，2:更新
  };

  category = {};

  columns = [
    {
      title: "类名",
      dataIndex: "name",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      render: (category) => (
        <span>
          <Button
            type="link"
            style={{ padding: "0" }}
            onClick={() => {
              this.category = category;
              this.setState({ showStatus: 2 });
            }}
          >
            修改分类
          </Button>
          {this.state.parentId === "0" ? (
            <Button
              type="link"
              style={{ padding: "0", marginLeft: "10px" }}
              onClick={() => this.getCategories(category._id, category.name)}
            >
              查看子分类
            </Button>
          ) : null}
        </span>
      ),
      width: "30%",
    },
  ];

  getCategories = async (parentId, parentName = "类名") => {
    this.setState({ loading: true });
    const result = await reqCategories(parentId);
    if (result.status === 0) {
      this.setState({
        categories: result.data,
        loading: false,
        parentName,
        parentId,
      });
    } else {
      message.error("获取分类失败");
    }
  };

  onCancel = () => this.setState({ showStatus: 0 });

  onAddCategory = (values) => {
    const { parentId, parentName } = this.state;
    if (!values.parentId) values = { parentId, ...values };
    reqAddCategory(values);
    this.setState({ showStatus: 0 });
    this.getCategories(parentId, parentName);
  };

  onUpdateCategory = (values) => {
    const { parentId, parentName } = this.state;
    values = { categoryId: this.category._id, ...values };
    reqUpdateCategory(values);
    this.setState({ showStatus: 0 });
    this.getCategories(parentId, parentName);
  };

  componentDidMount() {
    this.getCategories(this.state.parentId);
  }

  render() {
    const {
      categories: dataSource,
      parentId,
      loading,
      parentName,
      showStatus,
    } = this.state;

    const title =
      parentId === "0" ? (
        parentName
      ) : (
        <span>
          <Button type="link" onClick={() => this.getCategories("0")}>
            类名
          </Button>
          <RightOutlined />
          {parentName}
        </span>
      );

    const extra = (
      <Button
        icon={<PlusOutlined />}
        onClick={() => this.setState({ showStatus: 1 })}
      >
        添加
      </Button>
    );
    return (
      <Fragment>
        <Card title={title} extra={extra}>
          <Table
            rowKey="_id"
            dataSource={dataSource}
            columns={this.columns}
            loading={loading}
            pagination={{ showQuickJumper: true, defaultPageSize: 20 }}
          />
        </Card>
        <AddCategoryModal
          visible={showStatus === 1}
          onCancel={this.onCancel}
          onAddCategory={this.onAddCategory}
          categories={dataSource}
          parentId={parentId}
        />
        <UpdateCategoryModal
          onUpdateCategory={this.onUpdateCategory}
          onCancel={this.onCancel}
          category={this.category}
          visible={showStatus === 2}
        />
      </Fragment>
    );
  }
}
