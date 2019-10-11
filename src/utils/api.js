import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from "./_DATA";

export function getUsersAndQuestionsData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
    users,
    questions
  }));
}

export function saveQuestion(data) {
  return _saveQuestion(data);
}

export function saveQuestionAnswer(data) {
  return _saveQuestionAnswer(data);
}
