import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
        <h3>Would you rather?</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            name="optionOneText"
            type="text"
            value={optionOneText}
            placeholder="Enter Option 1"
            onChange={this.handleChange}
          />
          <input
            name="optionTwoText"
            type="text"
            value={optionTwoText}
            placeholder="Enter Option 2"
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
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
