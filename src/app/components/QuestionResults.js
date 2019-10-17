import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Card, Image, Progress, Divider } from "semantic-ui-react";

class QuestionResults extends Component {
  render() {
    const { id, question, user, users } = this.props;
    const { optionOne, optionTwo } = question;
    const total = optionOne.votes.length + optionTwo.votes.length;
    const vote = { width: 15, height: 15 };
    return (
      <div>
        <Segment>
          {question && user && (
            <Card>
              <Card.Content>
                <Image
                  floated="left"
                  size="medium"
                  src={users[question.author].avatarURL}
                  className="avatar"
                />
                <Card.Header>{users[question.author].name} asked</Card.Header>
                <Card.Meta>Results for Would you rather: </Card.Meta>
                <Card.Description>
                  <div className="result-option">
                    <p>{optionOne.text}</p>

                    <p>
                      has {optionOne.votes.length} out of {total} answers.
                    </p>
                    <Progress
                      percent={Math.floor((optionOne.votes.length / total) * 100)}
                      progress
                      color="teal"
                    />

                    {user.answers[id] === "optionOne" && (
                      <div className="your-vote">
                        <Segment circular inverted style={vote} color="teal">
                          You
                          <br />
                          chose!
                        </Segment>
                      </div>
                    )}
                  </div>
                  <Divider horizontal>OR</Divider>
                  <div className="result-option">
                    <p>{optionTwo.text}</p>

                    <p>
                      has {optionTwo.votes.length} out of {total} answers.
                    </p>
                    <Progress
                      percent={Math.floor((optionTwo.votes.length / total) * 100)}
                      progress
                      color="teal"
                    />

                    {user.answers[id] === "optionTwo" && (
                      <div className="your-vote">
                        <Segment circular inverted style={vote} color="teal">
                          You
                          <br />
                          chose!
                        </Segment>
                      </div>
                    )}
                  </div>
                </Card.Description>
              </Card.Content>
            </Card>
          )}
        </Segment>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authUser }, { id }) {
  return {
    question: questions[id],
    user: users[authUser],
    authUser,
    id,
    users
  };
}

export default connect(mapStateToProps)(QuestionResults);
