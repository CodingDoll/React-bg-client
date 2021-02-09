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
