import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

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
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="top"
        className="wyr-container"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h3" color="teal" textAlign="center">
            Login
          </Header>
          {users && (
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment>
                <div className="field">
                  <select onChange={this.handleChange} className="ui fluid selection dropdown">
                    <option value="">Please select user</option>
                    {Object.values(users).map(user => (
                      <option key={user.id} name="user" value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button color="teal" fluid size="large" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
          )}
        </Grid.Column>
      </Grid>
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
