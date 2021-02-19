import React, { Component } from "react";

import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqCategories, reqAddProduct, reqUpdateProduct } from "../../api";
import PictureWall from "../../components/PictureWall";
import RichTextEditor from "../../components/RichTextEditor";

const { Item } = Form;
const { TextArea } = Input;

export default class ProductAddUpdate extends Component {
  state = {
    isUpdate: !!this.props.location.state,
    options: [],
  };

  onFinish = async (values) => {
    // 1. 构造product对象
    const imgs = this.pw.getImgs();
    const detail = this.rte.getContent();
    const { name, desc, price, categoryIds } = values;
    let pCategoryId, categoryId;
    if (categoryIds.length === 1) {
      pCategoryId = "0";
      categoryId = categoryIds[0];
    } else {
      pCategoryId = categoryIds[0];
      categoryId = categoryIds[1];
    }

    const product = {
      name,
      desc,
      price,
      pCategoryId,
      categoryId,
      imgs,
      detail,
    };

    // 2.调用接口请求函数
    let result;
    if (this.state.isUpdate) {
      product._id = this.props.location.state._id;
      result = await reqUpdateProduct(product);
    } else {
      result = await reqAddProduct(product);
    }

    // 3.根据结果提示
    if (result.status === 0) {
      message.success(`${this.state.isUpdate ? "更新" : "添加"}商品成功！`);
      this.props.history.goBack();
    } else {
      message.error(`${this.state.isUpdate ? "更新" : "添加"}商品失败`);
    }
  };

  validatePrice = (_, value) => {
    if (value * 1 > 0) {
      return Promise.resolve();
    }
    return Promise.reject("请输入大于0的价格");
  };

  // 加载二级分类列表
  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    const subCategories = await this.getCategories(targetOption.value);
    targetOption.loading = false;
    if (subCategories && subCategories.length > 0) {
      const childOptions = subCategories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      targetOption.children = childOptions;
    } else {
      targetOption.isLeaf = true;
    }

    this.setState({ options: [...this.state.options] });
  };

  // 初始化options
  initOptions = async (categories) => {
    const options = categories.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));

    //如果是二级分类列表的更新
    const { isUpdate } = this.state;
    const product = this.props.location.state || {};
    const { pCategoryId } = product;
    if (isUpdate && pCategoryId !== "0") {
      const subCategories = await this.getCategories(pCategoryId);
      const childOptions = subCategories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      const targetOption = options.find(
        (option) => option.value === pCategoryId
      );
      targetOption.children = childOptions;
    }

    this.setState({ options });
  };

  // 获取分类列表
  getCategories = async (parentId) => {
    const result = await reqCategories(parentId);
    if (result.status === 0) {
      const categories = result.data;
      // 一级分类列表
      if (parentId === "0") {
        this.initOptions(categories);
      } else {
        // 二级分类列表
        return categories;
      }
    }
  };

  normFile = (e) => {
    console.log(e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  componentDidMount() {
    this.getCategories("0");
  }

  render() {
    const { isUpdate, options } = this.state;
    const product = this.props.location.state || {};
    const { pCategoryId, categoryId, imgs, detail } = product;
    const title = (
      <span>
        <ArrowLeftOutlined
          style={{ color: "#1890ff", marginRight: 10 }}
          onClick={() => this.props.history.goBack()}
        />
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </span>
    );

    const categoryIds = [];
    if (isUpdate) {
      if (pCategoryId === "0") {
        categoryIds.push(categoryId);
      } else {
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }

    const formItemLayout = { labelCol: { span: 3 }, wrapperCol: { span: 8 } };

    return (
      <Card title={title}>
        <Form {...formItemLayout} onFinish={this.onFinish}>
          <Item
            label="商品名称："
            name="name"
            initialValue={product.name}
            rules={[{ required: true, message: "请输入" }]}
          >
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item
            label="商品描述："
            name="desc"
            initialValue={product.desc}
            rules={[{ required: true, message: "请输入" }]}
          >
            <TextArea
              placeholder="请输入商品描述"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>
          <Item
            label="商品价格："
            name="price"
            initialValue={product.price}
            rules={[{ required: true, validator: this.validatePrice }]}
          >
            <Input type="number" addonAfter="元" placeholder="请输入价格" />
          </Item>
          <Item
            label="商品分类："
            name="categoryIds"
            initialValue={categoryIds}
            rules={[{ required: true, message: "请选择" }]}
          >
            <Cascader
              options={options}
              loadData={this.loadData}
              placeholder="请指定商品分类"
              changeOnSelect
            />
          </Item>
          <Item
            label="商品图片："
            name="imgs"
            valuePropName="fileList"
            getValueFromEvent={this.normFile}
          >
            <PictureWall ref={(e) => (this.pw = e)} imgs={imgs} />
          </Item>
          <Item
            label="商品详情："
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 18 }}
          >
            <RichTextEditor ref={(e) => (this.rte = e)} detail={detail} />
          </Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
      </Card>
    );
  }
}
