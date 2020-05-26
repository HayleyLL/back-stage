import React, { useEffect, useState } from "react";
import { Button, message, Tree } from "antd";
import { filterNodes, filterNodesByKeys } from "../../utils/tree";
import { userAuthorityApi, configApi } from "../../apis/";
import SystemAuthTree from "./systemAuthTree";

const UpdateUserAuthorities = (props) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [loadings, setLoadings] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys);
  };
  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys);
  };

  const changeLoadings = (bool, index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = bool;
    console.log(newLoadings, index);
    setLoadings(newLoadings);
  };

  function updateUserAuthorities(userId, codes, index) {
    userAuthorityApi
      .updateUserAuthorities(userId, codes)
      .then(function (response) {
        changeLoadings(false, index);
        message.success("Successfully saved the user's authorities!");
      })
      .catch(function (error) {
        changeLoadings();
        message.error("Failed to save the user's authorities!");
      });
  }

  const enterLoading = (index) => {
    changeLoadings(true, index);
    const authCodes = filterNodesByKeys(treeData, checkedKeys.checked).map(
      (node) => node.title
    );
    const userId = props.match.params.id;
    updateUserAuthorities(userId, authCodes, index);
  };

  const findKeysByCodes = (nodes, codes) => {
    const codeSet = new Set(codes);
    const filteredNodes = filterNodes(nodes, (node) => codeSet.has(node.title));
    return filteredNodes.map((node) => node.key);
  };

  function initAuthTree(systemAuthTree) {
    const data = systemAuthTree.data.value.tree;
    setTreeData(data);
    const keys = filterNodes(data).map((node) => node.key);
    setExpandedKeys(keys);
    return data;
  }

  function setUserCheckedKeys(treeData, userAuths) {
    const checkedKeys = findKeysByCodes(
      treeData,
      userAuths.map((item) => item.code)
    );
    setCheckedKeys(checkedKeys);
  }

  const initUserAuthTree = () => {
    const systemAuthTreeRequest = configApi.getSystemAuthTree();
    const userAuthsRequest = userAuthorityApi.getUserAuthorities(
      props.match.params.id
    );
    Promise.all([systemAuthTreeRequest, userAuthsRequest])
      .then((result) => {
        const [systemAuthTreeResp, userAuthsResp] = result;
        const treeData = initAuthTree(systemAuthTreeResp);
        setUserCheckedKeys(treeData, userAuthsResp.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch the user's authorities!");
      });
  };

  useEffect(initUserAuthTree, []);

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
        checkStrictly={true}
        onExpand={onExpand}
        defaultExpandAll={true}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        treeData={treeData}
      />
    </>
  );
};

export default UpdateUserAuthorities;
