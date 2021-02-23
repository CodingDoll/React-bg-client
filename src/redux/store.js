//store.js
import { createStore, applyMiddleware } from "redux";
//和applyMiddleware一起用于支持异步action,一般仓库只接收普通的对象
import thunk from "redux-thunk";
//启用redux开发者工具
import { composeWithDevTools } from "redux-devtools-extension";
//引入汇总的reducers
import reducers from "./reducers";

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
