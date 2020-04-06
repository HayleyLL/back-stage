import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import { usersUrl } from "../../httpRequest";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const NewUser = () => {
  const history = useHistory();

  //增加新用户
  const postNewUser = (email, password, name) => {
    axios({
      method: "post",
      url: usersUrl,
      data: {
        email,
        password,
        name,
      },
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then(function (response) {
        if (response.status === 200)
          //post请求成功后再导航至users页面,确保页面的数据已经更新
          history.replace("/admin/users");
        console.log("Added!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //提交表单回调
  const onFinish = (values) => {
    const { username, password, email } = values;
    postNewUser(email, password, username);
  };
  //失败回调
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="newUser">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          username: "请输入...",
          password: "",
          email: "请输入...",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
          rules={[{ required: true, message: "请输入您的密码！" }]}
        >
          <Input.Password />
        </Form.Item>
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
};

export default NewUser;
