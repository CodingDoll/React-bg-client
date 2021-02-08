/**
 * 发送异步ajax请求的函数模块
 * 封装axios库
 * 统一处理请求异常
 */

import { message } from "antd";
import axios from "axios";

export default function ajax(request) {
  const { url, data, method } = request;
  return new Promise((resolve, reject) => {
    let promise = axios({ url, data, method });
    promise
      .then((response) => resolve(response.data))
      .catch((error) => message.error("请求出错" + error.message));
  });
}
