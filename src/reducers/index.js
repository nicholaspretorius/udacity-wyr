import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

import authUser from "./authUser";
import questions from "./questions";
import users from "./users";

export default combineReducers({
  authUser,
  questions,
  users,
  loadingBar: loadingBarReducer
});
