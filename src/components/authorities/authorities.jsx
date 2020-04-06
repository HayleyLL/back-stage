import React, { Component } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "权限",
    dataIndex: "authority",
    key: "authority",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    id: "1",
  },
];
class Authorities extends Component {
  render() {
    return <Table columns={columns} dataSource={data} />;
  }
}

export default Authorities;
