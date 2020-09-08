import React from "react";
import { Link } from "react-router-dom";
import UsersTable from "../common/table/usersTable";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 250,
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 250,
  },
  {
    title: "操作",
    dataIndex: "actions",
    key: "actions",
    render: (text, record) => (
      <span style={{ verticalAlign: "middle" }}>
        <Link
          to={"/admin/checkUserAuth/" + record.id}
          style={{
            paddingRight: 8,
            marginRight: 8,
            borderRight: "solid 1px #7a7876",
          }}
        >
          <span
            style={{
              fontSize: 14,
              lineHeight: "14px",
              verticalAlign: "top",
            }}
          >
            查看权限
          </span>
        </Link>
        <Link to={"/admin/updateUserAuth/" + record.id}>
          <span
            style={{ fontSize: 14, lineHeight: "14px", verticalAlign: "top" }}
          >
            修改权限
          </span>
        </Link>
      </span>
    ),
  },
];

const Authorities = (props) => {
  const { requestUsers } = props;
  const pageSize = 6;
  return (
    <UsersTable
      columns={columns}
      requestUsers={requestUsers}
      pageSize={pageSize}
    />
  );
};

export default Authorities;
