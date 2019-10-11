import { showLoading, hideLoading } from "react-redux-loading";

import { getUsersAndQuestionsData } from "./../utils/api";

import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { setAuthUser } from "./authUser";

const AUTHED_USER = "tylermcginnis";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getUsersAndQuestionsData()
      .then(({ users, questions }) => {
        dispatch(setAuthUser(AUTHED_USER));
        dispatch(receiveQuestions(questions));
        dispatch(receiveUsers(users));
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn("There was an error fetching the initial data: ", e);
        alert("There was an error fetching the initial data.");
      });
  };
}
