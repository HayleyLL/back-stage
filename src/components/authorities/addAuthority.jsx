import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AuthForm from "./authForm";

const AddAuthority = (props) => {
  return (
    <AuthForm title="新增权限" refreshAuth={props.refreshAuth} id="addAuth">
      <Button type="primary" style={{ marginBottom: 15, marginRight: 25 }}>
        <PlusOutlined />
        添加权限
      </Button>
    </AuthForm>
  );
};

export default AddAuthority;
