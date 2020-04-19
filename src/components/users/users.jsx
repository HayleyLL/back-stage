import React from "react";
import { Link } from "react-router-dom";
import UsersTable from "../common/table/usersTable";
import Search from "../common/search/search";

const columns = [
  {
    title: "用户名",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Link to={"/admin/users/" + record.id} className="userName">
        {text}
      </Link>
    ),
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "age",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "address",
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
    key: "address",
  },
  {
    title: "操作",
    key: "actions",
    render: (text, record) => (
      <span>
        <Link
          className="update"
          to={"/admin/users/" + record.id}
          style={{ marginRight: 16 }}
        >
          修改
        </Link>
      </span>
    ),
  },
];

const UsersPage = (props) => {
  const { requestUsers } = props;
  const pageSize = 5;
  return (
    <div className="usersPart">
      <Search />
      <UsersTable
        columns={columns}
        requestUsers={requestUsers}
        pageSize={pageSize}
      />
      ;
    </div>
  );
};

export default UsersPage;
