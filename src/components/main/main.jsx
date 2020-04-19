import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import { usersUrl } from "../../httpRequest";
import UsersPage from "../users/users";
import NewUser from "../users/newUser";
import UpdateUser from "../users/updateUser";
import Authorities from "../authorities/authorities";
import UpdateUserAuthorities from "../authorities/updateUserAuthorities";
import SystemAuthorities from "../authorities/systemAuthorities";
import SystemAuthTree from "../authorities/systemAuthTree";
import NotFound from "../common/notFound";
import Home from "../common/home";

class Main extends Component {
  //请求users
  requestUsers(pageNum, pageSize) {
    const self = this;
    axios({
      method: "get",
      url: usersUrl,
      params: { pageNum, pageSize },
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then(function (response) {
        const data = response.data.list;
        const total = response.data.total;
        const users = data.map((user) => {
          user.key = user.id;
          user.createdAt = moment(user.createdAt).format("YYYY-MM-DD hh:mm:ss");
          user.updatedAt = moment(user.updatedAt).format("YYYY-MM-DD hh:mm:ss");
          return user;
        });
        const state = { ...self.state };
        state.users = users;
        state.pagination.total = total;
        self.setState(state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="main">
        <div className="content">
          <Switch>
            <Route
              exact
              path="/admin/users"
              render={(props) => (
                <UsersPage requestUsers={this.requestUsers} {...props} />
              )}
            />
            <Route exact path="/admin/users/newUser" component={NewUser} />
            <Route exact path="/admin/users/:id" component={UpdateUser} />
            <Route
              exact
              path="/admin/authorities"
              render={(props) => (
                <Authorities requestUsers={this.requestUsers} {...props} />
              )}
            />
            <Route
              exact
              path="/admin/systemAuthorities/tree"
              component={SystemAuthTree}
            />
            <Route
              exact
              path="/admin/systemAuthorities"
              component={SystemAuthorities}
            />
            <Route
              exact
              path="/admin/authorities/:id"
              component={UpdateUserAuthorities}
            />
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
