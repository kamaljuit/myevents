import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeScreen from "./Pages/Home Screen/HomeScreen.component";
import SignUpSignIn from "./Pages/SignUpSignIn/SignUpSignIn.component";
import "./App.css";

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/signup"
          exact
          render={() => (props.user ? <Redirect to="/" /> : <SignUpSignIn />)}
        />
        <Route
          path="/"
          exact
          render={() =>
            props.user ? <HomeScreen /> : <Redirect to="/signup" />
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  user: state.User.user
});
export default connect(mapStateToProps)(App);
