/**
 * 包含应用所有接口请求函数的模块
 */
import { message } from "antd";
import jsonp from "jsonp";
import ajax from "./ajax";

export const reqLogin = (username, password) =>
  ajax({ method: "post", url: "/login", data: { username, password } });

export const reqAddUser = (user) =>
  ajax({ method: "post", url: "/manage/user/add", user });

export const reqCategories = (parentId) =>
  ajax({
    method: "get",
    url: "/manage/category/list",
    params: { parentId },
  });

export const reqAddCategory = (values) =>
  ajax({
    method: "post",
    url: "/manage/category/add",
    data: values,
  });

export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax({
    method: "post",
    url: "/manage/category/update",
    data: { categoryId, categoryName },
  });

export const reqProducts = (pageNum, pageSize) =>
  ajax({
    method: "get",
    url: "/manage/product/list",
    params: { pageNum, pageSize },
  });

export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType,
  searchName,
}) =>
  ajax({
    method: "get",
    url: "/manage/product/search",
    params: { pageNum, pageSize, [searchType]: searchName },
  });

export const reqCategory = (categoryId) =>
  ajax({ method: "get", url: "/manage/category/info", params: { categoryId } });

export const reqUpdateStatus = (productId, status) =>
  ajax({
    method: "post",
    url: "/manage/product/updateStatus",
    data: { productId, status },
  });

export const reqDeleteImg = (name) =>
  ajax({
    method: "post",
    url: "/manage/img/delete",
    data: { name },
  });

export const reqAddProduct = (values) =>
  ajax({
    method: "post",
    url: "/manage/product/add",
    data: values,
  });

export const reqUpdateProduct = (values) =>
  ajax({
    method: "post",
    url: "/manage/product/update",
    data: values,
  });

export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=59edcc69f80df45c19cc3991296a9a47&city=440112`;
    jsonp(url, {}, (err, data) => {
      if (!err & (data.status === "1")) {
        resolve(data.lives[0].weather);
      } else {
        message.error("获取天气信息失败！" + err);
      }
    });
  });
};
