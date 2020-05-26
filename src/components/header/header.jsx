import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import { Avatar, Popover } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import Header from "../common/header/header";
import { signOutUrl } from "../../apis/httpRequest";

const MainHeader = (props) => {
  const text = <span>admin登录</span>;
  const content = (
    <div>
      <p>
        <a href="#" style={{ fontSize: 14 }} onClick={(e) => logout(e)}>
          退出登录
        </a>
      </p>
    </div>
  );
  let history = useHistory();
  //登出清理token并回到登录页面
  const logout = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: signOutUrl,
    }).then(function () {
      localStorage.removeItem("token");
      history.push("/");
    });
  };

  const { state, toggle } = props;
  return (
    <React.Fragment>
      {React.createElement(
        state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: toggle,
        }
      )}
      <div style={{ display: "inline-block", float: "right", marginRight: 10 }}>
        <Popover
          placement="bottomRight"
          title={text}
          content={content}
          trigger="click"
        >
          <Avatar
            size="small"
            style={{
              backgroundColor: "#87d068",
            }}
            icon={<UserOutlined />}
          />
          <CaretDownOutlined style={{ fontSize: 10, color: "#ababab" }} />
        </Popover>
      </div>
      <Switch>
        <Route
          exact
          path="/admin/users"
          render={(props) => (
            <Header
              href="/admin"
              previousItem="首页"
              currentItem="用户管理"
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/admin/users/newUser"
          render={(props) => (
            <Header
              href="/admin/users"
              previousItem="用户管理"
              currentItem="增加新用户"
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/admin/users/:id"
          render={(props) => (
            <Header
              href="/admin/users"
              previousItem="用户管理"
              currentItem="更新用户"
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/admin/authorities"
          render={(props) => (
            <Header
              href="/admin/users"
              previousItem="用户列表"
              currentItem="用户权限管理"
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/admin/systemAuthorities/tree"
          render={(props) => (
            <Header
              href="/admin/systemAuthorities"
              previousItem="权限管理"
              currentItem="树状图"
              {...props}
            />
          )}
        />

        <Route
          exact
          path="/admin/systemAuthorities"
          render={(props) => (
            <Header
              href="/admin/authorities"
              previousItem="用户权限管理"
              currentItem="系统权限管理"
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/admin/authorities/:id"
          render={(props) => (
            <Header
              href="/admin/authorities"
              previousItem="权限管理"
              currentItem="更新用户权限"
              {...props}
            />
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

export default MainHeader;
