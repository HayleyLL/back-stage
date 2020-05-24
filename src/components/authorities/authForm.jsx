import React, { Component, cloneElement, Fragment } from "react";
import { Input, Modal } from "antd";
import axios from "axios";
import { systemAuthUrl } from "../../apis/httpRequest";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      input: {
        code: "",
        description: "",
      },
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //确定回调
  handleOk = () => {
    const { code, description } = this.state.input;
    let self = this;
    const { id, record } = this.props;
    if (id === "updateAuth") {
      axios({
        method: "put",
        url: systemAuthUrl + "/" + record.id,
        data: {
          code,
          description,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then(function (response) {
          //put请求成功后再发请求，确保数据已经更新
          if (response.status === 200) {
            console.log(self.props);
            self.props.refreshAuth();
            console.log("Authority Updated!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (id === "addAuth") {
      axios({
        method: "post",
        url: systemAuthUrl,
        data: {
          code,
          description,
        },
        headers: { Authorization: localStorage.getItem("token") },
      })
        .then(function (response) {
          //post请求成功后再发请求，确保数据已经更新
          if (response.status === 200) {
            self.props.refreshAuth();
            console.log("Authority Added!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    this.setState({
      confirmLoading: true,
    });

    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = ({ target }) => {
    const input = { ...this.state.input };
    target.id === "code"
      ? (input.code = target.value)
      : (input.description = target.value);
    this.setState({ input });
  };

  renderInput = () => {
    const { code } = this.state.input;
    const { id, record } = this.props;
    return id === "addAuth" ? (
      <Input
        placeholder="权限的描述"
        id="code"
        value={code}
        onChange={this.onChange}
        style={{ marginBottom: 30 }}
      />
    ) : (
      <Input
        placeholder={record.code}
        disabled
        id="code"
        value={code}
        onChange={this.onChange}
        style={{ marginBottom: 30 }}
      />
    );
  };

  render() {
    const { visible, confirmLoading, input } = this.state;
    const { title, children } = this.props;
    return (
      <Fragment>
        {cloneElement(children, { onClick: this.showModal })}
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
          width="400px"
        >
          {this.renderInput()}
          <Input
            placeholder="权限的描述"
            id="description"
            value={input.description}
            onChange={this.onChange}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default AuthForm;
