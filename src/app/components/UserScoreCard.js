import React from "react";
import { Card, Image, Divider } from "semantic-ui-react";

const UserScoreCard = ({ user }) => {
  if (user) {
    return (
      <Card>
        <Card.Content>
          <Image floated="left" size="medium" src={user.avatarURL} className="avatar" />
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>Score: {user.score.total}</Card.Meta>

          <Card.Description>
            <p>Asked questions: {user.score.questions}</p>
            <Divider horizontal>AND</Divider>
            <p>Answered questions: {user.score.answers}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default UserScoreCard;
