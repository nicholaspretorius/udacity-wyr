import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Nav = props => {
  const { authUser, users } = props;

  console.log(users);
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/new">New Question</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
        <li>{authUser}</li>
      </ul>
    </div>
  );
};

function mapStateToProps({ authUser, users }) {
  return { authUser, users };
}

export default connect(mapStateToProps)(Nav);
