import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Segment, Card, Image, Button, Grid, Divider } from "semantic-ui-react";

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
        <Segment.Group horizontal>
          <Segment>
            {question && hasAnswered && <QuestionResults id={id} />}
            {question && !hasAnswered && (
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
                    <form onSubmit={this.handleSubmit}>
                      <Grid columns={2} stackable textAlign="center">
                        <Divider vertical>Or</Divider>
                        <Grid.Row verticalAlign="middle">
                          <Grid.Column>
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
                          </Grid.Column>

                          <Grid.Column>
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
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <Button type="submit">Submit</Button>
                    </form>
                  </Card.Description>
                </Card.Content>
              </Card>
            )}
            {!question && <Redirect to="/" />}
          </Segment>
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
