import React from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import axios from "axios";
import BackStage from "./backStage";
import LoginForm from "./components/login/loginForm";
import NotFound from "./components/common/notFound";

const App = () => {
  localStorage.setItem("auth_codes", "user_auth_management_menu")

  //拦截器
  let history = useHistory();
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = localStorage.getItem("token");
      return config;
    },
    error => error
  );

  axios.interceptors.response.use(
    config => config,
    function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        history.push("/admin/login");
        return Promise.reject(error);
      }
    }
  );

  //根据是否有token渲染页面
  function PrivateRoute({children, ...rest}) {
    const token = localStorage.getItem("token");
    return (
      <Route
        {...rest}
        render={({location}) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/admin/login",
                state: {from: location},
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Switch>
      <Route path="/admin/login" component={LoginForm}/>
      <PrivateRoute path={["/admin", "/"]}>
        <BackStage/>
      </PrivateRoute>
      <Redirect from="/" to="/admin/login"/>
      <Route path="/not-found" component={NotFound}/>
      <Redirect to="/not-found"/>
    </Switch>
  );
};

export default App;
