import React, { Component } from "react";
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";

class QuestionResults extends Component {
  render() {
    const { id, question, user } = this.props;
    const { optionOne, optionTwo } = question;
    const total = optionOne.votes.length + optionTwo.votes.length;
    return (
      <div>
        {question && user && (
          <div>
            <h3>Would you rather Results</h3>
            <p>
              {optionOne.text}
              <br />
              has {optionOne.votes.length} out of {total} answers.
              <Progress percent={(optionOne.votes.length / total) * 100} progress />
              <br />
              {user.answers[id] === "optionOne" && <span>You chose!</span>}
            </p>
            <p>OR</p>
            <p>
              {optionTwo.text}
              <br />
              has {optionTwo.votes.length} out of {total} answers.
              <Progress percent={(optionTwo.votes.length / total) * 100} progress />
              <br />
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
