import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import { usersUrl } from "../../apis/httpRequest";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.requestUser = this.requestUser.bind(this);
  }

  //获取该id用户信息并设置到form中
  requestUser() {
    let self = this;
    axios({
      method: "get",
      url: usersUrl + "/" + this.props.match.params.id,
    })
      .then(function (response) {
        const user = {
          username: response.data.name,
          email: response.data.email,
          password: "",
        };
        const { _form } = self.refs;
        //设置字段默认值
        _form.setFieldsValue(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //更新用户
  updateUser(email, password, name, id) {
    let self = this;
    axios({
      method: "put",
      url: usersUrl + "/" + id,
      data: {
        email,
        password,
        name,
      },
    })
      .then(function (response) {
        //请求成功后导航至users页面并刷新
        self.props.history.replace("/admin/users");
        console.log("Updated!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //提交表单回调
  onFinish(values) {
    const { username, password, email } = values;
    const { id } = this.props.match.params;
    this.updateUser(email, password, username, id);
  }
  //失败回调
  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  componentDidMount() {
    this.requestUser();
  }

  render() {
    return (
      <div className="newUser">
        <Form
          ref="_form"
          {...layout}
          name="basic"
          initialValues={{ username: "", email: "", password: "" }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            required={true}
            name="email"
            label="邮箱"
            rules={[
              { type: "email" },
              { required: true, message: "请输入您的邮箱！" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入您的用户名！" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ message: "请输入您的密码！" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default UpdateUser;
