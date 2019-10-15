import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { logoutAuthUser } from "./../../actions/authUser";
import { logout } from "./../services/localStorage";

const Nav = props => {
  const { authUser, users, dispatch } = props;
  const user = users[authUser];

  return (
    <nav className="ui secondary menu">
      <Link to="/">
        <div className="header item">
          <h3>Would you rather?</h3>
        </div>
      </Link>
      {authUser !== "" && user && (
        <Fragment>
          <NavLink exact to="/" className="item">
            Home
          </NavLink>

          <NavLink to="/leaderboard" className="item">
            Leaderboard
          </NavLink>

          <NavLink to="/add" className="item">
            New Question
          </NavLink>
          <div className="right menu">
            <div className="item">{user.name}</div>
            <NavLink
              to="/logout"
              onClick={() => {
                logout();
                dispatch(logoutAuthUser(authUser));
              }}
              className="item"
            >
              Logout
            </NavLink>
          </div>
        </Fragment>
      )}
      {authUser === "" && (
        <div className="right menu">
          <NavLink to="/login" className="item">
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

function mapStateToProps({ authUser, users }) {
  return { authUser, users };
}

export default connect(mapStateToProps)(Nav);
