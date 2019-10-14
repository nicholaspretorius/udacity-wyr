import React, { Component } from "react";
import { connect } from "react-redux";

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
    const { id, question, user } = this.props;
    const { selectedOption } = this.state;
    let hasAnswered = false;

    if (user) {
      hasAnswered = this.hasUserAnswered(id);
    }

    return (
      <div>
        {question && hasAnswered && <QuestionResults id={id} />}
        {question && !hasAnswered && (
          <form onSubmit={this.handleSubmit}>
            <span>Would you rather:</span>
            <div>
              <input
                type="radio"
                name="answer"
                value="optionOne"
                checked={selectedOption === "optionOne"}
                onChange={this.handleChange}
              />
              <label>{question.optionOne.text}</label>
            </div>
            <div>
              <input
                type="radio"
                name="answer"
                value="optionTwo"
                checked={selectedOption === "optionTwo"}
                onChange={this.handleChange}
              />
              <label>{question.optionTwo.text}</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authUser, questions, users }, props) {
  const { id } = props.match.params;

  console.log("mapStateToProps: ", questions);
  console.log("mapStateToProps: ", users);

  return {
    id,
    authUser,
    question: questions[id],
    user: users[authUser]
  };
}

export default connect(mapStateToProps)(Question);