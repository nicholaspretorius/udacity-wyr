import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutAuthUser } from "./../../actions/authUser";

const Nav = props => {
  const { authUser, dispatch } = props;

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

        {authUser !== "" && (
          <div>
            <li>
              <Link to="/logout" onClick={() => dispatch(logoutAuthUser(authUser))}>
                Logout
              </Link>
            </li>
            <li>{authUser}</li>
          </div>
        )}
        {authUser === "" && <Link to="/login">Login</Link>}
      </ul>
    </div>
  );
};

function mapStateToProps({ authUser, users }) {
  return { authUser, users };
}

export default connect(mapStateToProps)(Nav);
