import React, { Component } from "react";
import MainTable from "./table";

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      pagination: {
        pageNum: 1,
        total: 0,
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page, pageSize) {
    const state = { ...this.state };
    state.pagination.pageNum = page;
    this.setState(state);

    this.props.requestUsers.call(this, page, pageSize);
  }

  componentDidMount() {
    const { pageNum } = this.state.pagination;
    const { pageSize } = this.props;
    this.props.requestUsers.call(this, pageNum, pageSize);
  }

  componentDidUpdate(prevProps) {
    const prevLocation = prevProps.location;
    const location = this.props.location;
    const { pageNum } = this.state.pagination;
    const { pageSize } = this.props;

    if (prevLocation !== location)
      this.props.requestUsers.call(this, pageNum, pageSize);
  }

  render() {
    const { columns } = this.props;
    const { total } = this.state.pagination;
    const { pageSize } = this.props;
    const pagination = { pageSize, total, onChange: this.handlePageChange };
    return (
      <MainTable
        columns={columns}
        data={this.state.users}
        pagination={pagination}
      />
    )
  }
}

export default UsersTable;
