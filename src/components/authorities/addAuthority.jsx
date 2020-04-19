import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AuthForm from "./authForm";

class AddAuthority extends React.Component {
  render() {
    return (
      <AuthForm title="新增权限">
        <Button type="primary" style={{ marginBottom: 15, marginRight: 25 }}>
          <PlusOutlined />
          添加权限
        </Button>
      </AuthForm>
    );
  }
}

export default AddAuthority;
