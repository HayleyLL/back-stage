import React, { Component } from "react";
import { Route } from "react-router-dom";
import Users from "../contents/users";
import "./main.scss";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="content">
          <Route exact path="/users" component={Users} />
        </div>
      </div>
    );
  }
}

export default Main;
