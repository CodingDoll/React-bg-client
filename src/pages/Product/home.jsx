import React, { Component } from "react";

import { Card, Select, Input, Button, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constant";

const { Option } = Select;

export default class ProductHome extends Component {
  state = {
    total: 0,
    loading: true,
    products: [],
    searchName: "",
    searchType: "productName",
    pageNum: 1,
  };

  columns = [
    { title: "名称", dataIndex: "name" },
    { title: "商品描述", dataIndex: "desc" },
    { title: "价格", dataIndex: "price", render: (price) => "¥" + price },
    {
      title: "状态",
      width: 150,
      render: (product) => {
        const { status, _id } = product;
        const newStatus = status === 1 ? 2 : 1;
        return (
          <span>
            <span style={{ marginRight: 5 }}>
              {status === 1 ? "在售" : "已下架"}
            </span>
            <Button
              type="primary"
              onClick={() => this.updateStatus(_id, newStatus)}
            >
              {status === 1 ? "下架" : "上架"}
            </Button>
          </span>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "",
      width: 150,
      render: (product) => (
        <span>
          <Button
            type="link"
            style={{ padding: "0" }}
            onClick={() =>
              this.props.history.push("/product/detail", { product })
            }
          >
            详情
          </Button>
          <Button
            type="link"
            style={{ padding: "0", marginLeft: 10 }}
            onClick={() =>
              this.props.history.push("/product/addupdate", product)
            }
          >
            修改
          </Button>
        </span>
      ),
    },
  ];

  updateStatus = async (productId, status) => {
    console.log(productId, status);
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success("更新商品成功");
      this.getProducts(this.state.pageNum);
    }
  };

  getProducts = async (pageNum) => {
    this.setState({ loading: true, pageNum });
    const { searchName, searchType } = this.state;

    const result = searchName
      ? await reqSearchProducts({
          pageNum,
          pageSize: PAGE_SIZE,
          searchName,
          searchType,
        })
      : await reqProducts(pageNum, PAGE_SIZE);
    this.setState({ loading: false });
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({ total, products: list });
    }
  };

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, loading, total, searchName, searchType } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          value={searchName}
          style={{ width: 150, margin: "0 15px" }}
          onChange={(event) =>
            this.setState({ searchName: event.target.value })
          }
        />
        <Button onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    );
    const extra = (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => this.props.history.push("/product/addupdate")}
      >
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={products}
          columns={this.columns}
          rowKey="_id"
          loading={loading}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            total,
            onChange: this.getProducts,
          }}
        />
      </Card>
    );
  }
}
