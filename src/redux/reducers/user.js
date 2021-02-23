import storageUtils from "../../utils/storageUtils";
import { RECEIVE_USER, RESET_USER, SHOW_ERROR_MSG } from "../action-types";

const initUser = storageUtils.getUser();
export default function userReducer(preState = initUser, action) {
  const { type, data } = action;
  switch (type) {
    case RECEIVE_USER:
      return data;
    case SHOW_ERROR_MSG:
      return { ...preState, errorMsg: data };
    case RESET_USER:
      return {};
    default:
      return preState;
  }
}
