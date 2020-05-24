import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card } from "antd";
import axios from "axios";
import { signInUrl } from "../../apis/httpRequest";

const layout = {
  wrapperCol: {
    span: 30,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LoginForm = () => {
  let history = useHistory();
  let location = useLocation();

  //发送登录用户信息
  const login = (name, password) => {
    axios({
      method: "post",
      url: signInUrl,
      data: {
        name,
        password,
      },
    })
      .then(function (response) {
        let { from } = location.state || { from: { pathname: "/admin" } };

        if (response.status === 200) {
          //获取验证token
          const token = response.data.token;
          localStorage.setItem("token", token);
          history.replace(from);
        }
      })
      //处理错误
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.error.message);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  //提交表单回调
  const onFinish = ({ username, password }) => {
    login(username, password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card
      title="密码登录"
      extra={<a href="/">忘记密码</a>}
      style={{
        width: 300,
        //水平垂直居中
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Form
        {...layout}
        name="basic"
        size="medium"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名！",
            },
          ]}
        >
          <Input
            placeholder="请输入账户名"
            style={{
              borderTop: "none",
              borderRight: "none",
              borderLeft: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        >
          <Input.Password
            placeholder="请输入密码"
            style={{
              borderTop: "none",
              borderRight: "none",
              borderLeft: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
