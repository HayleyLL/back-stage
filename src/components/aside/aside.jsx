import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Switch } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import "./aside.scss";
import "antd/dist/antd.css";

const { SubMenu } = Menu;
const siderData = [
  {
    title: "运营中心",
    key: "operation",
    to: "",
  },
  {
    title: "商品管理",
    key: "goods",
    to: "",
  },
  {
    title: "订单管理",
    key: "orders",
    to: "",
  },
  {
    title: "图片管理",
    key: "pictures",
    to: "",
  },
  {
    title: "消息中心",
    key: "messages",
    to: "",
  },
  {
    title: "权限中心",
    key: "authority",
    to: "",
  },
  {
    title: "客服管理",
    key: "services",
    to: "",
  },
  {
    title: "小程序",
    key: "applet",
    to: "",
  },
];

class Aside extends Component {
  state = {
    theme: "dark",
    current: "1",
  };

  changeTheme = (value) => {
    this.setState({
      theme: value ? "dark" : "light",
    });
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className="siderBar">
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <div className="logo">
            <span>管理中心</span>
          </div>
          <Menu.Item key="users">
            <Link to="/admin/users">用户列表</Link>
          </Menu.Item>
          <SubMenu
            key="authorities"
            title={
              <span>
                <span>权限管理</span>
              </span>
            }
          >
            <Menu.Item key="usersAuth">
              <Link to="/admin/authorities">用户权限管理</Link>
            </Menu.Item>
            <Menu.Item key="systemAuth">
              <Link to="/admin/systemAuthorities">系统权限管理</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <SettingOutlined />
                <span>支付宝账户</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
          {siderData.map((c) => (
            <Menu.Item key={c.key}>
              <Link to={c.to}>{c.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
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
