import React, { Component } from "react";

import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { reqCategory } from "../../api/index";
import { BASE_IMG_URL } from "../../utils/constant";

const { Item } = List;

export default class ProductDetail extends Component {
  state = {
    cName1: "",
    cName2: "",
  };

  async componentDidMount() {
    const { pCategoryId, categoryId } = this.props.location.state.product;
    if (pCategoryId === "0") {
      const result = await reqCategory(categoryId);
      const cName1 = result.data.name;
      this.setState({ cName1 });
    } else {
      // const result1 = await reqCategory(pCategoryId);
      // const result2 = await reqCategory(categoryId);
      // const cName1 = result1.data.name;
      // const cName2 = result2.data.name;

      const results = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId),
      ]);
      const cName1 = results[0].data.name;
      const cName2 = results[1].data.name;
      this.setState({ cName1, cName2 });

      this.setState({ cName1, cName2 });
    }
  }

  render() {
    const {
      name,
      desc,
      price,
      imgs,
      detail,
    } = this.props.location.state.product;
    const { cName1, cName2 } = this.state;
    const title = (
      <span>
        <ArrowLeftOutlined
          style={{ color: "#1890ff", marginRight: 10 }}
          onClick={() => this.props.history.goBack()}
        />
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span>
              <span className="left">商品名称：</span>
              <span>{name}</span>
            </span>
          </Item>
          <Item>
            <span>
              <span className="left">商品描述：</span>
              <span>{desc}</span>
            </span>
          </Item>
          <Item>
            <span>
              <span className="left">商品价格：</span>
              <span>{price}元</span>
            </span>
          </Item>
          <Item>
            <span>
              <span className="left">所属分类：</span>
              <span>
                {cName1} {cName2 ? "-->" + cName2 : ""}
              </span>
            </span>
          </Item>
          <Item>
            <span>
              <span className="left">商品图片：</span>
              <span>
                {imgs ? (
                  imgs.map((img) => (
                    <img
                      key={img}
                      className="product-img"
                      src={BASE_IMG_URL + img}
                      alt="img"
                    />
                  ))
                ) : (
                  <></>
                )}
              </span>
            </span>
          </Item>
          <Item>
            <span>
              <span className="left">商品详情：</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: detail,
                }}
              ></span>
            </span>
          </Item>
        </List>
      </Card>
    );
  }
}
