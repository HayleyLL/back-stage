import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { getPromise } from "../../apis/api";
import { systemAuthUrl } from "../../apis/httpRequest";

const { SubMenu } = Menu;

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
