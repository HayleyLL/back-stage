import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import UsersPage from "../users/users";
import NewUser from "../users/newUser";
import UpdateUser from "../users/updateUser";
import Authorities from "../authorities/authorities";
import NotFound from "../common/notFound";
import Home from "../common/home";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="content">
          <Switch>
            <Route exact path="/admin/users" component={UsersPage} />
            <Route exact path="/admin/users/newUser" component={NewUser} />
            <Route exact path="/admin/users/:id" component={UpdateUser} />
            <Route exact path="/admin/authorities" component={Authorities} />
            <Route exact path="/admin" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
