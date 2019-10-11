import React, { Component } from "react";
import { connect } from "react-redux";

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
    console.log("Options: ", optionOneText, optionTwoText);
    const { dispatch } = this.props;
    dispatch(handleAddQuestion({ optionOneText, optionTwoText }));

    this.setState({
      data: {
        optionOneText: "",
        optionTwoText: ""
      }
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    const data = { ...this.state.data };
    data[name] = value;

    this.setState({ data });
  };

  render() {
    const { optionOneText, optionTwoText } = this.state.data;

    return (
      <div>
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

export default connect()(NewQuestion);
