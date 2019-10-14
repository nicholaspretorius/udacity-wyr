import React, { Component } from "react";
import { connect } from "react-redux";

import { setAuthUser } from "./../../actions/authUser";
import { login } from "./../services/localStorage";

class Login extends Component {
  state = {
    user: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = this.state.user;
    const { dispatch } = this.props;
    dispatch(setAuthUser(user));
    login(user);
    const { state } = this.props.location;
    window.location = state ? state.from.pathname : "/";
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ user: value });
  };

  render() {
    const { users } = this.props;
    return (
      <div>
        {users && (
          <form onSubmit={this.handleSubmit}>
            <select onChange={this.handleChange}>
              <option value="">Please select</option>
              {Object.values(users).map(user => (
                <option key={user.id} name="user" value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    users,
    authUser
  };
}

export default connect(mapStateToProps)(Login);
