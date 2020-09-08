import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Switch } from "antd";
import { TeamOutlined, BankOutlined, UnlockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { SubMenu } = Menu;

class Aside extends Component {
  state = {
    theme: "dark",
    current: "1",
    color: "rgba(255, 255, 255, 0.65)",
  };

  changeTheme = (value) => {
    this.setState({
      theme: value ? "dark" : "light",
      color: value ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.65)",
    });
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div
        className="siderBar"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={["authorities"]}
          selectedKeys={[this.state.current]}
          mode="inline"
          style={{ flex: "1 1 auto" }}
        >
          <Menu.Item
            key="logo"
            className="logo"
            style={{
              margin: 0,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <BankOutlined />
            <span>管理中心</span>
          </Menu.Item>
          <Menu.Item key="users">
            <TeamOutlined />
            <span>
              <Link to="/admin/users" style={{ color: this.state.color }}>
                用户列表
              </Link>
            </span>
          </Menu.Item>
          <SubMenu
            key="authorities"
            title={
              <>
                <UnlockOutlined />
                <span>权限管理</span>
              </>
            }
          >
            <Menu.Item key="usersAuth">
              <Link to="/admin/userAuth">用户权限管理</Link>
            </Menu.Item>
            <Menu.Item key="systemAuth">
              <Link to="/admin/systemAuthorities">系统权限管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <Switch
          checked={this.state.theme === "dark"}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          className="toggleTheme"
          style={{
            margin: "10px 5px",
            felx: "0 0 auto",
            width: 60,
          }}
        />
      </div>
    );
  }
}

export default Aside;
