import React from "react";
import { Link } from "react-router-dom";
import { Popover } from "antd";

import DropDown from "./dropdown";
import {
  FormOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";

const content = (
  <div>
    <DropDown>
      <Link to="" onClick={(e) => e.preventDefault()}>
        <PlusCircleOutlined style={{ marginRight: 5 }} />
        新增子节点
        <DownOutlined />
      </Link>
    </DropDown>
    <Link to="" onClick={(e) => e.preventDefault()}>
      <MinusCircleOutlined style={{ marginRight: 5 }} />
      删除此节点
    </Link>
  </div>
);
const PopOver = () => {
  return (
    <Popover content={content} title="操作">
      <FormOutlined />
    </Popover>
  );
};

export default PopOver;
