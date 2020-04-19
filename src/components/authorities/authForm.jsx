import React, { Component, cloneElement, Fragment } from "react";
import { Input, Modal } from "antd";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      input: {
        codeValue: "",
        dscrptValue: "",
      },
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    //要发送请求
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = ({ target }) => {
    const input = { ...this.state.input };
    target.id === "code"
      ? (input.codeValue = target.value)
      : (input.dscrptValue = target.value);
    this.setState({ input });
  };
  render() {
    const { visible, confirmLoading, input } = this.state;
    const { title, children } = this.props;
    console.log(children);
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
          <Input
            placeholder="权限的CODE"
            id="code"
            value={input.codeValue}
            onChange={this.onChange}
            style={{ marginBottom: 30 }}
          />
          <Input
            placeholder="权限的描述"
            id="description"
            value={input.dscrptValue}
            onChange={this.onChange}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default AuthForm;
