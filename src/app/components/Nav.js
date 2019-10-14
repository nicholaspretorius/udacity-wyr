import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutAuthUser } from "./../../actions/authUser";
import { logout } from "./../services/localStorage";

const Nav = props => {
  const { authUser, dispatch } = props;

  return (
    <div>
      {authUser !== "" && (
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
            <Link
              to="/logout"
              onClick={() => {
                logout();
                dispatch(logoutAuthUser(authUser));
              }}
            >
              Logout
            </Link>
          </li>
          <li>{authUser}</li>
        </ul>
      )}
      {authUser === "" && (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

function mapStateToProps({ authUser, users }) {
  return { authUser, users };
}

export default connect(mapStateToProps)(Nav);
