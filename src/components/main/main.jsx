import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import { usersUrl } from "../../apis/httpRequest";
import UsersPage from "../users/users";
import NewUser from "../users/newUser";
import UpdateUser from "../users/updateUser";
import UserAuthorities from "../authorities/userAuthorities";
import UpdateUserAuthorities from "../authorities/updateUserAuthorities";
import checkUserAuthoroties from "../authorities/checkUserAuthorities";
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
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(function (response) {
        const data = response.data.list;
        const total = response.data.total;
        // debugger
        data.forEach((user) => {
          user.key = user.id;
          user.createdTime = moment(user.createdTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );

          user.updatedTime = moment(user.updatedTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        });
        const state = { ...self.state };
        state.users = data;
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
              path="/admin/userAuth"
              render={(props) => (
                <UserAuthorities requestUsers={this.requestUsers} {...props} />
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
              path="/admin/checkUserAuth/:id"
              component={checkUserAuthoroties}
            />
            <Route
              exact
              path="/admin/updateUserAuth/:id"
              component={UpdateUserAuthorities}
            />
            <Route exact path={["/admin", "/"]} component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
