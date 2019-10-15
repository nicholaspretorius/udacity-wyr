import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";

import { handleInitialData } from "./../actions/shared";
import { setAuthUser } from "./../actions/authUser";
import { getCurrentUser } from "./../app/services/localStorage";

import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import NewQuestion from "./components/NewQuestion";
import Question from "./components/Question";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import Nav from "./components/Nav";

import "./App.css";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const user = getCurrentUser();
    dispatch(setAuthUser(user));
    dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          {loading === false && (
            <div className="app">
              <Nav />
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/question/:id" component={Question} />
                <Route path="/new" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/login" exact component={Login} />
                <Route path="/logout" exact component={Logout} />
                <Route component={NotFound} />
              </Switch>
            </div>
          )}
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    loading: authUser === null
  };
}

export default connect(mapStateToProps)(App);
