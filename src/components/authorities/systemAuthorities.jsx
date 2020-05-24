import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "antd";
import AddAuthority from "./addAuthority";
import AuthForm from "./authForm";
import { systemAuthUrl } from "../../apis/httpRequest";

class SystemAuthorities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorities: [],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 5,
      },
    };
  }

  refreshAuth = (
    pageNum = this.state.pagination.pageNum,
    pageSize = this.state.pagination.pageSize
  ) => {
    let self = this;
    axios({
      method: "get",
      url: systemAuthUrl,
      params: {
        pageNum,
        pageSize,
      },
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then(function (response) {
        const total = response.data.total;
        const state = { ...self.state };
        const newList = response.data.list.map((item) => {
          item.key = item.id;
          return item;
        });
        state.authorities = newList;
        state.pagination.total = total;
        self.setState(state);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    //获取系统权限数据
    const { pageNum, pageSize } = this.state.pagination;
    this.refreshAuth(pageNum, pageSize);
  }

  handlePageChange = (page, pageSize) => {
    const state = { ...this.state };
    state.pagination.pageNum = page;
    this.setState(state);

    this.refreshAuth(page, pageSize);
  };

  render() {
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
            <AuthForm
              title="修改权限"
              id="updateAuth"
              refreshAuth={this.refreshAuth}
              record={record}
            >
              <a style={{ marginRight: 16 }}>修改</a>
            </AuthForm>
            <a>删除</a>
          </span>
        ),
      },
    ];

    const { authorities, pagination } = this.state;
    const { pageSize, total } = pagination;
    const pagination2 = {
      pageSize,
      total,
      onChange: this.handlePageChange,
    };

    return (
      <div>
        <AddAuthority refreshAuth={this.refreshAuth} />
        <Link to="/admin/systemAuthorities/tree">
          <Button type="dashed">树状图</Button>
        </Link>
        <Table
          columns={columns}
          dataSource={authorities}
          pagination={pagination2}
        />
      </div>
    );
  }
}

export default SystemAuthorities;
