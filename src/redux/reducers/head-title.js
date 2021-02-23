import { SET_HEAD_TITLE } from "../action-types";

const initHeadTitle = "首页";

export default function headTitle(preState = initHeadTitle, action) {
  const { type, data } = action;
  switch (type) {
    case SET_HEAD_TITLE:
      return data;
    default:
      return preState;
  }
}
