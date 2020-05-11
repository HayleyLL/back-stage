import React, { useState, useEffect } from "react";
import { Tree, Button, message } from "antd";
import { systemConfigsUrl } from "../../httpRequest";
import { getPromise } from "./api";

const UpdateUserAuthorities = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeys) => {
    console.log("onExpand", expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys) => {
    console.log("onCheck", checkedKeys);
    setCheckedKeys(checkedKeys);
  };
  const onSelect = (selectedKeys, info) => {
    console.log("onSelect", info);

    setSelectedKeys(selectedKeys);
  };

  const success = () => {
    message.success("Successfully saved the user's authorities!");
  };

  const error = () => {
    message.error("Failed to save the user's authorities!");
  };

  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    setLoadings(newLoadings);
    //点击保存发送用户权限数据

    newLoadings[index] = false;
    setLoadings(newLoadings);
    success();
  };

  const [loadings, setLoadings] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const getTreeData = () => {
    getPromise(systemConfigsUrl, 1, 1000)
      .then(function (response) {
        const { list } = response.data;
        const data = list[0].value.tree;
        setTreeData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(getTreeData, []);

  return (
    <>
      <Button
        type="primary"
        ghost
        loading={loadings[0]}
        onClick={() => enterLoading(0)}
        style={{ marginBottom: 15 }}
      >
        保存
      </Button>

      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    </>
  );
};

export default UpdateUserAuthorities;
