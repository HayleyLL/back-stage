import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import BackStage from "./backStage";
import LoginForm from "./components/login/loginForm";
import NotFound from "./components/common/notFound";

const App = (props) => {
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
      <PrivateRoute path="/admin">
        <BackStage />
      </PrivateRoute>
      <Redirect from="/" to="/admin/login" />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default App;
