import React from "react";
import { Popover } from "antd";

import DropDown from "./dropdown";
import {
  FormOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  DownOutlined,
  EditOutlined,
} from "@ant-design/icons";

const PopOver = (props) => {
  const {
    id,
    handleMouseEnter,
    handleAddClick,
    handleReplaceClick,
    handleDeleteClick,
  } = props;
  const content = (
    <div>
      <DropDown handleClick={handleAddClick}>
        <a href="#" onClick={(e) => e.preventDefault()}>
          <PlusSquareOutlined style={{ marginRight: 5 }} />
          新增子节点
          <DownOutlined />
        </a>
      </DropDown>
      <DropDown handleClick={handleReplaceClick}>
        <a href="#" onClick={(e) => e.preventDefault()}>
          <EditOutlined style={{ marginRight: 5 }} />
          修改此节点
          <DownOutlined />
        </a>
      </DropDown>
      <a href="#" onClick={handleDeleteClick}>
        <DeleteOutlined style={{ marginRight: 5 }} />
        删除此节点
      </a>
    </div>
  );

  return (
    <Popover content={content} title="操作">
      <span id={id} onMouseEnter={handleMouseEnter}>
        <FormOutlined />
      </span>
    </Popover>
  );
};

export default PopOver;
