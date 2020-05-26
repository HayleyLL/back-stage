import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import BackStage from "./backStage";
import LoginForm from "./components/login/loginForm";
import NotFound from "./components/common/notFound";

const App = () => {
  //拦截器
  let history = useHistory();
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.Authorization = token;
      return config;
    },
    function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        history.push("/admin/login");
        return Promise.reject(error);
      }
    }
  );

  //根据是否有token渲染页面
  function PrivateRoute({ children, ...rest }) {
    const token = localStorage.getItem("token");
    return (
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/admin/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Switch>
      <Route path="/admin/login" component={LoginForm} />
      <PrivateRoute path={["/admin", "/"]}>
        <BackStage />
      </PrivateRoute>
      <Redirect from="/" to="/admin/login" />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default App;
