import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";

import { handleInitialData } from "./../actions/shared";
import authUser from "./../reducers/authUser";
import "./App.css";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className="app">Hello World!</div>
      </Fragment>
    );
  }
}

function mapStateToProps() {
  return {
    loading: authUser === null
  };
}

export default connect(mapStateToProps)(App);
