import { showLoading, hideLoading } from "react-redux-loading";

import { saveQuestion, saveQuestionAnswer } from "./../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

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

function answerQuestion(answer) {
  return {
    type: ANSWER_QUESTION,
    answer
  };
}

// thunks
export function handleAddQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authUser
    })
      .then(question => {
        dispatch(addQuestion(question));
      })
      .then(() => dispatch(hideLoading()))
      .catch(e => {
        console.warn("Error in handleAddQuestion", e);
        alert("There was an error adding the question");
      });
  };
}

export function handleAnswerQuestion({ answer, qid }) {
  return (dispatch, getState) => {
    const { authUser } = getState();
    const userAnswer = {
      authedUser: authUser,
      qid,
      answer
    };

    dispatch(showLoading());
    return saveQuestionAnswer(userAnswer)
      .then(() => {
        dispatch(answerQuestion(userAnswer));
      })
      .then(() => {
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn("Error in handleAnswerQuestion", e);
        alert("There was an error adding the answer");
      });
  };
}
