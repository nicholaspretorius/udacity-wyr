import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Segment, Card, Form, Button, Divider } from "semantic-ui-react";

import { handleAddQuestion } from "./../../actions/questions";

class NewQuestion extends Component {
  state = {
    data: {
      optionOneText: "",
      optionTwoText: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state.data;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion({ optionOneText, optionTwoText }));

    this.setState({
      data: {
        optionOneText: "",
        optionTwoText: ""
      }
    });

    this.props.history.push("/");
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    const data = { ...this.state.data };
    data[name] = value;

    this.setState({ data });
  };

  render() {
    const { optionOneText, optionTwoText } = this.state.data;
    const { authUser } = this.props;

    if (authUser === "") {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h3>New Question</h3>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Card>
              <Card.Content>
                <Card.Header>Would you rather?</Card.Header>
                <Card.Description>
                  <Form.Field>
                    <input
                      name="optionOneText"
                      type="text"
                      value={optionOneText}
                      placeholder="Enter Option 1"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Divider horizontal>OR</Divider>
                  <Form.Field>
                    <input
                      name="optionTwoText"
                      type="text"
                      value={optionTwoText}
                      placeholder="Enter Option 2"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button type="submit">Submit</Button>
              </Card.Content>
            </Card>
          </Form>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
