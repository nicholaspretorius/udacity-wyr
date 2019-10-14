import React from "react";

const UserScoreCard = ({ user }) => {
  if (user) {
    return (
      <div>
        <h4>{user.name}</h4>
        <p>Answered questions: {user.score.answers}</p>
        <p>Asked questions: {user.score.questions}</p>
        <p>Score: {user.score.total}</p>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default UserScoreCard;
