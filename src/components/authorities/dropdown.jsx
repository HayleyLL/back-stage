import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { getPromise } from "./api";
import { systemConfigsUrl, systemAuthUrl } from "../../httpRequest";

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

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  //获取系统权限
  componentDidMount() {
    let self = this;
    getPromise(systemAuthUrl, 1, 1000)
      .then(function (response) {
        const data = [...response.data.list];
        self.setState({ data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //根据数据渲染菜单
  mapToMenu = (data) => {
    const { handleClick } = this.props;
    const copyData = this.state.data;
    let menuItems = [];
    data.map((item) => {
      if (!item.children) {
        menuItems.push(<Menu.Item key={item.id}>{item.code}</Menu.Item>);
      } else
        menuItems.push(
          <SubMenu
            title={item.code}
            key={item.id}
            onTitleClick={(e) => handleClick(e, copyData)}
          >
            {this.mapToMenu(item.children)}
          </SubMenu>
        );
    });
    return menuItems;
  };

  render() {
    const { children, handleClick } = this.props;
    const copyData = [...this.state.data];
    const menu = (
      <Menu onClick={(e) => handleClick(e, copyData)}>
        {this.mapToMenu(copyData)}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomRight">
        <div style={{ marginBottom: 15 }}>{children}</div>
      </Dropdown>
    );
  }
}

export default DropDown;
