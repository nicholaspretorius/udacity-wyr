import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionPreview extends Component {
  state = {};
  render() {
    const { id, question } = this.props;
    return (
      <div>
        {id}: Would you rather: {question.optionOne.text} or {question.optionTwo.text} ?
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authUser }, { id }) {
  const question = questions[id];

  return {
    question,
    authUser
  };
}

export default connect(mapStateToProps)(QuestionPreview);
