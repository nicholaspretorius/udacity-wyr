import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Segment, Card, Image, Button, Divider } from "semantic-ui-react";

import { handleAnswerQuestion } from "./../../actions/questions";

import QuestionResults from "./QuestionResults";

class Question extends Component {
  state = {
    selectedOption: "optionOne"
  };

  hasUserAnswered(id) {
    const { user } = this.props;
    const answers = Object.keys(user.answers);
    return answers.includes(id);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { selectedOption } = this.state;
    const { id, dispatch } = this.props;
    dispatch(
      handleAnswerQuestion({
        answer: selectedOption,
        qid: id
      })
    );

    this.setState({
      selectedOption: "optionOne"
    });
  };

  handleChange = ({ target }) => {
    this.setState({ selectedOption: target.value });
  };

  render() {
    const { id, question, user, users } = this.props;
    const { selectedOption } = this.state;
    let hasAnswered = false;

    if (user) {
      hasAnswered = this.hasUserAnswered(id);
    }

    return (
      <div>
        <h3>Question</h3>
        <Segment.Group horizontal>
          {question && hasAnswered && <QuestionResults id={id} />}
          {!question && <Redirect to="/" />}
          {question && !hasAnswered && (
            <Segment>
              <form onSubmit={this.handleSubmit}>
                <Card>
                  <Card.Content>
                    <Image
                      floated="left"
                      size="medium"
                      src={users[question.author].avatarURL}
                      className="avatar"
                    />
                    <Card.Header>{users[question.author].name} asks</Card.Header>
                    <Card.Meta>Would you rather: </Card.Meta>
                    <Card.Description>
                      <div>
                        <input
                          type="radio"
                          name="answer"
                          value="optionOne"
                          checked={selectedOption === "optionOne"}
                          onChange={this.handleChange}
                        />
                        <label> {question.optionOne.text}</label>
                      </div>
                      <Divider horizontal>OR</Divider>
                      <div>
                        <input
                          type="radio"
                          name="answer"
                          value="optionTwo"
                          checked={selectedOption === "optionTwo"}
                          onChange={this.handleChange}
                        />
                        <label> {question.optionTwo.text}</label>
                      </div>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="teal" type="submit">
                      Submit
                    </Button>
                  </Card.Content>
                </Card>
              </form>
            </Segment>
          )}
        </Segment.Group>
      </div>
    );
  }
}

function mapStateToProps({ authUser, questions, users }, props) {
  const { id } = props.match.params;

  return {
    id,
    authUser,
    question: questions[id],
    user: users[authUser],
    users
  };
}

export default connect(mapStateToProps)(Question);
