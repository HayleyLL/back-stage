import React, { Component } from "react";
import { Table } from "antd";

class MainTable extends Component {
  render() {
    const { columns, data, pagination } = this.props;
    return (
      <Table columns={columns} dataSource={data} pagination={pagination} />
    );
  }
}

export default MainTable;
