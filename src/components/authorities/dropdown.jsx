import React, { Component } from "react";
import { Menu, Dropdown } from "antd";

const { SubMenu } = Menu;
const data = [
  {
    id: "1",
    code: "1st menu item",
    description: "aaa",
  },
  {
    id: "2",
    code: "2st menu item",
    description: "bbb",
    children: [
      {
        id: "2-1",
        code: "2-1st menu item",
        description: "b-aaa",
      },
      {
        id: "2-2",
        code: "2-2st menu item",
        description: "b-bbb",
      },
    ],
  },
  {
    id: "3",
    code: "3st menu item",
    description: "ccc",
  },
  {
    id: "4",
    code: "4st menu item",
    description: "ddd",
    children: [
      {
        id: "4-1",
        code: "4-1st menu item",
        description: "d-aaa",
      },
      {
        id: "4-2",
        code: "4-2st menu item",
        description: "d-bbb",
      },
    ],
  },
];

//根据数据渲染菜单
const mapToMenu = (data) => {
  let menuItems = [];
  data.map((item) => {
    if (!item.children)
      menuItems.push(<Menu.Item key={item.id}>{item.code}</Menu.Item>);
    else
      menuItems.push(
        <SubMenu title={item.code} key={item.id}>
          {mapToMenu(item.children)}
        </SubMenu>
      );
  });
  return menuItems;
};

const menu = <Menu>{mapToMenu(data)}</Menu>;

class DropDown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <Dropdown overlay={menu} placement="bottomRight">
        <div style={{ marginBottom: 15 }}>{children}</div>
      </Dropdown>
    );
  }
}

export default DropDown;
