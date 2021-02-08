/**
 * 包含应用所有接口请求函数的模块
 */
import ajax from "./ajax";

export const reqLogin = (username, password) =>
  ajax({ method: "post", url: "/login", data: { username, password } });

export const reqAddUser = (user) =>
  ajax({ method: "post", url: "/manage/user/add", user });
