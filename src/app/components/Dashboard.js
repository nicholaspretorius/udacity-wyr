import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Tab } from "semantic-ui-react";

import QuestionList from "./QuestionList";

class Dashboard extends Component {
  render() {
    const { loading, questionIds, questions, users, authUser } = this.props;
    let answeredIds, unansweredIds;

    if (loading === false && users[authUser]) {
      answeredIds = Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        .filter(q => {
          return Object.keys(users[authUser].answers).includes(q);
        });
      unansweredIds = _.difference(questionIds, answeredIds);
    }

    const panes = [
      {
        menuItem: "Unanswered",
        render: () => (
          <Tab.Pane>
            <QuestionList questions={unansweredIds} title="Unanswered Questions" />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Answered",
        render: () => (
          <Tab.Pane>
            <QuestionList questions={answeredIds} title="Answered Questions" />
          </Tab.Pane>
        )
      }
    ];

    return (
      <div>
        <h2>Dashboard</h2>

        {loading === false && users && questions && <Tab panes={panes} />}
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
