import React, { Component } from "react";
import { connect } from "react-redux";

import { handleAnswerQuestion } from "./../../actions/questions";

class Question extends Component {
  state = {
    selectedOption: "optionOne"
  };

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

    console.log("Selected: ", selectedOption, " for ", id, " by ", this.props.authUser);
  };

  handleChange = ({ target }) => {
    this.setState({ selectedOption: target.value });
  };

  render() {
    const { question } = this.props;
    const { selectedOption } = this.state;
    return (
      <div>
        {question && (
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

function mapStateToProps({ authUser, questions }, props) {
  const { id } = props.match.params;

  return {
    id,
    authUser,
    question: questions[id]
  };
}

export default connect(mapStateToProps)(Question);
