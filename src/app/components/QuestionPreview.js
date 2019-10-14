import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionPreview extends Component {
  state = {};
  render() {
    const { id, question } = this.props;
    return (
      <div>
        {question && (
          <Link to={`/question/${id}`}>
            {id}: Would you rather: {question.optionOne.text} or {question.optionTwo.text} ?
          </Link>
        )}
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
