import React, { Component } from "react";
import { connect } from "react-redux";

import QuestionPreview from "./QuestionPreview";

class Dashboard extends Component {
  state = {};
  render() {
    const { questionIds } = this.props;
    return (
      <div>
        <h2>Dashboard</h2>
        <div>
          <ul>
            {questionIds &&
              questionIds.map(id => (
                <li key={id}>
                  <QuestionPreview id={id} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Dashboard);
