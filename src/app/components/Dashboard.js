import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import QuestionList from "./QuestionList";

class Dashboard extends Component {
  state = {};

  render() {
    const { loading, questionIds, questions, users, authUser } = this.props;
    let answeredIds, unansweredIds;

    if (loading === false && users[authUser]) {
      answeredIds = Object.keys(users[authUser].answers);
      unansweredIds = _.difference(questionIds, answeredIds);
      console.log("Answered: ", answeredIds);
      console.log("Unanswered: ", unansweredIds);
    }

    return (
      <div>
        <h2>Dashboard</h2>
        {loading === false && users && questions && (
          <div>
            {unansweredIds && (
              <QuestionList questions={unansweredIds} title="Unanswered Questions" />
            )}
            {answeredIds && <QuestionList questions={answeredIds} title="Answered Questions" />}
          </div>
        )}
        {loading === true && <div>Loading...</div>}
      </div>
    );
  }
}

function mapStateToProps({ authUser, users, questions }) {
  return {
    loading: users[authUser] === undefined,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    questions,
    users,
    authUser
  };
}

export default connect(mapStateToProps)(Dashboard);
