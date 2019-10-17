import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import UserScoreCard from "./UserScoreCard";

class Leaderboard extends Component {
  sortUsers(users) {
    return users
      .map(user => {
        const answers = Object.keys(user.answers).length;
        const questions = user.questions.length;
        const total = answers + questions;
        return {
          ...user,
          score: { answers, questions, total }
        };
      })
      .sort((a, b) => b.score.total - a.score.total);
  }

  render() {
    const { authUser, users } = this.props;
    const userDetails = Object.values(users);
    const sortedUsers = this.sortUsers(userDetails);

    if (authUser === "") {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h3>Leaderboard</h3>

        <Segment>
          <ol>
            {users &&
              sortedUsers.map(user => (
                <li key={user.id}>
                  <UserScoreCard user={user} />
                </li>
              ))}
          </ol>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps({ authUser, users }) {
  return {
    authUser,
    users
  };
}

export default connect(mapStateToProps)(Leaderboard);
