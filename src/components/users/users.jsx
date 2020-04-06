import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import MainTable from "../common/table/table";
import Search from "../common/search/search";
import axios from "axios";
import { usersUrl } from "../../httpRequest";

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
    key: "action",
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

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      pagination: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  //请求users
  requestUsers() {
    const { pageNum, pageSize } = this.state.pagination;
    const self = this;
    axios({
      method: "get",
      url: usersUrl,
      params: { pageNum, pageSize },
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then(function (response) {
        const data = response.data.list;
        const total = response.data.total;
        const users = data.map((user) => {
          user.key = user.id;
          user.createdAt = moment(user.createdAt).format("YYYY-MM-DD hh:mm:ss");
          user.updatedAt = moment(user.updatedAt).format("YYYY-MM-DD hh:mm:ss");
          return user;
        });
        const state = { ...self.state };
        state.users = users;
        state.pagination.total = total;
        self.setState(state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.requestUsers();
  }

  componentDidUpdate(prevProps) {
    const { prevLocation } = prevProps.location;
    const { location } = this.props.location;
    if (prevLocation !== location) this.requestUsers();
  }

  handlePageChange(page, pageSize) {
    const state = { ...this.state };
    state.pagination.pageNum = page;
    this.setState(state);
    this.requestUsers();
  }

  render() {
    const { pageSize, total } = this.state.pagination;
    const pagination = { pageSize, total, onChange: this.handlePageChange };

    return (
      <div className="usersPart">
        <Search />
        <MainTable
          columns={columns}
          data={this.state.users}
          pagination={pagination}
          handleCellClick={this.handleCellClick}
        />
      </div>
    );
  }
}

export default UsersPage;
