import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionPreview extends Component {
  render() {
    const { id, question } = this.props;

    return (
      <div>
        {question && (
          <div>
            <Link to={`/question/${id}`}>
              Would you rather: {question.optionOne.text} or {question.optionTwo.text}? (
              {new Date(question.timestamp).toUTCString()})
            </Link>
          </div>
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
