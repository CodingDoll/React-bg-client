# 一个按照教程敲出来的后台

## 所涉及的技术工具

- React
- React Router
- axios
- less
- Antd
- Redux
- nginx(简单了解)
- echarts(简单了解)
- postman

## 功能涉及到

- 登录
- 分类管理（增删查改）
- 商品管理（增删查改）
- 角色管理（用户权限功能但仅仅体现在可查看菜单项）
- 用户管理（增删改）
- 图形图表（仅仅了解到 echart 的初步使用）

## 遇到过的问题

### antd modal form

#### 描述

ant design 在 Modal 中使用 Form 表单，并且通过`Form.useForm()`， 获取 form 对象将其挂载到指定的 Form 表单后仍会出现'Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop'警告

#### 原因

这是由于 ant design 的 Modal 组件会在 Form 表单之前创建，因此当页面初始化时 form 对象会找不到可关联的 Form 表单，于是出现上述警告。

#### 解决

给 Modal 加上`forceRender`属性。

### BrowserRouter

#### 描述

刷新路由路径时，会出现 404 错误，页面显示‘Cannot Get ···’

#### 原因

项目根路径后的 path 路径会被当成后台路由路径，去请求对应的后台路径，但后台中没有。
HashRouter 不会触发这个问题的原因是路径中含有/#/home，/#使得请求后台时都是返回根路径。

#### 解决

在后台加上中间件

```
// 必须在路由器中间之后声明使用
app.use((req, res) => {
  fs.readFile(__dirname + "/public/index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.send("后台错误");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end(data);
    }
  });
});
```

#### 注意

后台路由路径和前端路由路径不可以相同。
