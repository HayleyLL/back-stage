import React, { useEffect, useState } from "react";
import { message, Tree } from "antd";
import { CheckSquareTwoTone } from "@ant-design/icons";
import { filterNodes, filterNodesByKeys } from "../../utils/tree";
import { userAuthorityApi, configApi } from "../../apis/";

const CheckUserAuthorities = (props) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState([]);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
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
    return checkedKeys;
  }

  const matchKey = (key, data) => {
    for (let item of data) {
      if (key === item.key) {
        item.icon = <CheckSquareTwoTone />;
      } else {
        if (item.children) matchKey(key, item.children);
      }
    }
  };

  const addIcon = (checkedKeys, treeData) => {
    for (let key of checkedKeys) {
      matchKey(key, treeData);
    }
  };

  const initUserAuthTree = () => {
    const systemAuthTreeRequest = configApi.getSystemAuthTree();
    const userAuthsRequest = userAuthorityApi.getUserAuthorities(
      props.match.params.id
    );
    Promise.all([systemAuthTreeRequest, userAuthsRequest])
      .then((result) => {
        const [systemAuthTreeResp, userAuthsResp] = result;
        const treeData = initAuthTree(systemAuthTreeResp);
        const checkedKeys = setUserCheckedKeys(treeData, userAuthsResp.data);

        addIcon(checkedKeys, treeData);
        setTreeData([...treeData]);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch the user's authorities!");
      });
  };

  useEffect(initUserAuthTree, []);

  return (
    <Tree
      showIcon={true}
      onExpand={onExpand}
      defaultExpandAll={true}
      autoExpandParent={true}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      treeData={treeData}
    />
  );
};

export default CheckUserAuthorities;
