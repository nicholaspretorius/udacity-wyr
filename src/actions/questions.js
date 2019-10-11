import { showLoading, hideLoading } from "react-redux-loading";

import { saveQuestion } from "./../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

//action creators
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

// thunks
export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      question,
      author: authedUser
    })
      .then(question => {
        dispatch(addQuestion(question));
      })
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn("Error in handleAddTweet", e);
        alert("There was an error adding the tweet");
      });
  };
}
