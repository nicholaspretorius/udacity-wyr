import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

class QuestionPreview extends Component {
  render() {
    const { id, question, users } = this.props;

    return (
      <Card>
        <Card.Content>
          <Image
            floated="left"
            size="medium"
            src={users[question.author].avatarURL}
            className="avatar"
          />
          <Card.Header>{users[question.author].name}</Card.Header>
          <Card.Meta>Would you rather: </Card.Meta>
          <Card.Description>
            {question && (
              <Link to={`/questions/${id}`}>
                {question.optionOne.text} or {question.optionTwo.text}?
              </Link>
            )}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="calendar outline" />({new Date(question.timestamp).toUTCString()})
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps({ users, questions, authUser }, { id }) {
  const question = questions[id];

  return {
    question,
    authUser,
    users
  };
}

export default connect(mapStateToProps)(QuestionPreview);
