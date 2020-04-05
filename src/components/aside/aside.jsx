import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Menu, Switch } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import "./aside.scss";
import "antd/dist/antd.css";

const { SubMenu } = Menu;
const { Header } = Layout;

class Aside extends Component {
  state = {
    theme: "dark",
    current: "1"
  };

  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    });
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <div className="siderBar">
        <Header
          className="site-layout-background"
          style={{ padding: 10, backgroundColor: "white" }}
        >
          用户管理中心
        </Header>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <Menu.Item key="users">
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="another">
            <Link to="/another">Another</Link>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <AppstoreOutlined />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <SettingOutlined />
                <span>Navigation Three</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
        <br />
        <br />
        <Switch
          checked={this.state.theme === "dark"}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          className="toggleTheme"
        />
      </div>
    );
  }
}

export default Aside;
