import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Segment, Card } from "semantic-ui-react";

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
        <h3>Welcome</h3>
        <Segment>
          {users && (
            <Form size="large" onSubmit={this.handleSubmit} className="central">
              <Card>
                <Card.Content>
                  <Card.Header>Login</Card.Header>
                  <Card.Description>
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
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button color="teal" fluid size="large" type="submit">
                    Login
                  </Button>
                </Card.Content>
              </Card>
            </Form>
          )}
        </Segment>
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
