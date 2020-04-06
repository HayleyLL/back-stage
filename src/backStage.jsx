import React, { Component } from "react";
import { Layout } from "antd";
import Aside from "./components/aside/aside";
import MainHeader from "./components/header/header";
import Main from "./components/main/main";
import "antd/dist/antd.css";
import "./backStage.css";

const { Sider, Content, Header } = Layout;
class BackStage extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          theme="light"
        >
          <Aside />
        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background layoutHeader"
            style={{ padding: 0, height: "auto", margin: 0 }}
          >
            <MainHeader state={this.state} toggle={this.toggle} />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px 0 16px",
              padding: 24,
              paddingBottom: 0,
              minHeight: 280,
            }}
          >
            <Main />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BackStage;
