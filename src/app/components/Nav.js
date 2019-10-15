import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { logoutAuthUser } from "./../../actions/authUser";
import { logout } from "./../services/localStorage";

import "./Nav.css";

const Nav = props => {
  const { authUser, dispatch } = props;

  return (
    <nav className="ui secondary menu">
      <Link to="/">
        <div className="header item">
          <h3>Would you rather?</h3>
        </div>
      </Link>
      {authUser !== "" && (
        <Fragment>
          <NavLink exact to="/" className="item">
            Home
          </NavLink>

          <NavLink to="/leaderboard" className="item">
            Leaderboard
          </NavLink>

          <NavLink to="/new" className="item">
            New Question
          </NavLink>
          <div className="right menu">
            <div className="item">{authUser}</div>
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
          <Link to="/login" className="item">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

function mapStateToProps({ authUser, users }) {
  return { authUser, users };
}

export default connect(mapStateToProps)(Nav);
