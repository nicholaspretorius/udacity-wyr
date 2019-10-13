import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionResults extends Component {
  render() {
    const { id, question, user } = this.props;
    const { optionOne, optionTwo } = question;
    const total = optionOne.votes.length + optionTwo.votes.length;
    return (
      <div>
        {question && user && (
          <div>
            <h3>Question {id}: Results</h3>
            <p>
              {optionOne.text} has {optionOne.votes.length} out of {total} answers.
              <br />
              {(optionOne.votes.length / total) * 100} %
              {user.answers[id] === "optionOne" && <span>You chose!</span>}
            </p>
            <p>
              {optionTwo.text} has {optionTwo.votes.length} out of {total} answers.
              <br />
              {(optionTwo.votes.length / total) * 100} %
              {user.answers[id] === "optionTwo" && <span>You chose!</span>}
            </p>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authUser }, { id }) {
  return {
    question: questions[id],
    user: users[authUser],
    authUser,
    id
  };
}

export default connect(mapStateToProps)(QuestionResults);
