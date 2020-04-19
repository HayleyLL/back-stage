import React from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "antd";
import AddAuthority from "./addAuthority";
import AuthForm from "./authForm";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "CODE",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
  },

  {
    title: "操作",
    key: "actions",
    render: (text, record) => (
      <span>
        <AuthForm title="修改权限">
          <a style={{ marginRight: 16 }}>修改</a>
        </AuthForm>
        <a>删除</a>
      </span>
    ),
  },
];

const data = [
  {
    key: "1",
    id: "1",
    code: "request_users",
    description: "请求用户数据",
  },
  {
    key: "2",
    id: "2",
    code: "another",
    description: "微信数据",
  },
  {
    key: "3",
    id: "3",
    code: "yetAnother",
    description: "支付宝数据",
  },
  {
    key: "4",
    id: "4",
    code: "anotherOne",
    description: "微博数据",
  },
  {
    key: "1",
    id: "1",
    code: "lastOne",
    description: "权限数据",
  },
];

const SystemAuthorities = () => {
  return (
    <div>
      <AddAuthority />
      <Link to="/admin/systemAuthorities/tree">
        <Button type="dashed">树状图</Button>
      </Link>
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};

export default SystemAuthorities;
