import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { Tab, Menu, Label } from "semantic-ui-react";

import QuestionList from "./QuestionList";

function getAnsweredIds(questions, user) {
  return Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .filter(q => {
      return Object.keys(user.answers).includes(q);
    });
}

class Dashboard extends Component {
  render() {
    const { loading, questionIds, questions, users, authUser } = this.props;
    const user = users[authUser];
    let answeredIds,
      unansweredIds,
      panes = [];

    if (authUser === "") {
      return <Redirect to="/login" />;
    }

    if (loading === false && user) {
      answeredIds = getAnsweredIds(questions, user);
      unansweredIds = _.difference(questionIds, answeredIds);

      panes = [
        {
          menuItem: (
            <Menu.Item key="unanswered">
              Unanswered<Label>{unansweredIds.length}</Label>
            </Menu.Item>
          ),
          render: () => (
            <Tab.Pane>
              <QuestionList questions={unansweredIds} title="Unanswered Questions" />
            </Tab.Pane>
          )
        },
        {
          menuItem: (
            <Menu.Item key="answered">
              Answered<Label>{answeredIds.length}</Label>
            </Menu.Item>
          ),
          render: () => (
            <Tab.Pane>
              <QuestionList questions={answeredIds} title="Answered Questions" />
            </Tab.Pane>
          )
        }
      ];
    }

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
    questions,
    users,
    authUser,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Dashboard);
