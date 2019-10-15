import React from "react";

const UserScoreCard = ({ user }) => {
  if (user) {
    return (
      <div>
        <h4>{user.name}</h4>
        <div>
          <img src={user.avatarURL} alt={user.name} />
        </div>
        <p>Asked questions: {user.score.questions}</p>
        <p>Answered questions: {user.score.answers}</p>
        <p>Score: {user.score.total}</p>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default UserScoreCard;
