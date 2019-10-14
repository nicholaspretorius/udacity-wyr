import React from "react";

const UserScoreCard = ({ user }) => {
  let answers, questions, total;
  if (user) {
    answers = Object.keys(user.answers).length;
    questions = user.questions.length;
    total = answers + questions;
    return (
      <div>
        <h4>{user.name}</h4>
        <p>Answered questions: {answers}</p>
        <p>Asked questions: {questions}</p>
        <p>Score: {total}</p>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default UserScoreCard;
