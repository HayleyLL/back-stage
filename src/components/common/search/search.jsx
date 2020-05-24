import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { usersUrl } from "../../../apis/httpRequest";
import "./search.scss";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //提交搜索信息
  postSearchName(name) {
    axios({
      method: "get",
      url: usersUrl,
      params: { name },
      headers: { Authorization: localStorage.getItem("token") },
    }).catch(function (error) {
      console.log(error);
    });
  }

  handleChange({ target }) {
    this.setState({ value: target.value });
  }

  handleClick() {
    const { value } = this.state;
    this.postSearchName(value);
  }

  render() {
    return (
      <div className="searchBar">
        <Input
          placeholder="请输入用户名"
          className="searchInput"
          onChange={this.handleChange}
        />
        <Button type="primary" className="btn" onClick={this.handleClick}>
          查询
        </Button>
        <Button className="btn">重置</Button>
        <br />
        <Link to="/admin/users/newUser">
          <Button
            type="primary"
            className="btn"
            style={{ marginBottom: 10, marginRight: 0, marginTop: 10 }}
          >
            <PlusOutlined /> 创建
          </Button>
        </Link>
      </div>
    );
  }
}

export default Search;
