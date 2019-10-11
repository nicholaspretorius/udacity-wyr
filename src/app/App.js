import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";

import { handleInitialData } from "./../actions/shared";
import authUser from "./../reducers/authUser";

import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import NewQuestion from "./components/NewQuestion";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Nav from "./components/Nav";

import "./App.css";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <div className="app">
            <Nav />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/new" component={NewQuestion} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/login" exact component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps() {
  return {
    loading: authUser === null
  };
}

export default connect(mapStateToProps)(App);
