import { showLoading, hideLoading } from "react-redux-loading";

import { getUsersAndQuestionsData } from "./../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getUsersAndQuestionsData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn("There was an error fetching the initial data: ", e);
        alert("There was an error fetching the initial data.");
      });
  };
}
