import React, { Component } from "react";
import { Tree } from "antd";
import { v4 } from "uuid";
import PopOver from "./popover";
import { systemConfigsUrl } from "../../httpRequest";
import { getPromise } from "./api";

class ShowAuthTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gData: [
        {
          title: "root",
          key: "root",
          icon: (
            <PopOver
              handleAddClick={this.handleAddClick}
              handleReplaceClick={this.handleReplaceClick}
              handleMouseEnter={this.handleMouseEnter}
              handleDeleteClick={this.handleDeleteClick}
              id="root"
            />
          ),
        },
      ],
      expandedKeys: ["0-0", "0-0-0", "0-0-0-0"],
      popOverKey: "",
    };
  }

  //获取menu中点击的节点
  mapToGetNode = (e, data) => {
    for (let item of data) {
      if (item.id == e.key) {
        //这里id为num, key为字符串？
        return { ...item };
      } else if (item.children) {
        let current = this.mapToGetNode(e, item.children);
        if (current) {
          return current;
        }
      }
    }
  };

  //遍历selectedNode获得其children及后代
  getChildrenOfSelectedNode = (selectedNode) => {
    if (!selectedNode.children) return { title: selectedNode.code, key: v4() };
    else {
      let children = selectedNode.children;
      let parentChildren = children.map((child) => {
        return this.getChildrenOfSelectedNode(child);
      });
      return { title: selectedNode.code, key: v4(), children: parentChildren };
    }
  };

  //查找gData中key值为popOverKey的节点并添加新的child
  addChild = (popOverKey, parents, selectedNode) => {
    let itmesToAdd = this.getChildrenOfSelectedNode(selectedNode);
    return parents.map((node) => {
      if (!node.children) {
        if (node.key === popOverKey) {
          node.children = [itmesToAdd];
        }
      } else {
        if (node.key === popOverKey) node.children.push(itmesToAdd);
        else this.addChild(popOverKey, node.children, selectedNode);
      }
      return node;
    });
  };

  //给新增树节点添加icon及icon的id
  addIdToNewChildIcon = (newData, popOverKey) => {
    let loop = (children) => {
      for (let child of children) {
        if (!child.icon) {
          child.icon = (
            <PopOver
              handleAddClick={this.handleAddClick}
              handleReplaceClick={this.handleReplaceClick}
              handleMouseEnter={this.handleMouseEnter}
              handleDeleteClick={this.handleDeleteClick}
              id={child.key}
            />
          );
          if (child.children) loop(child.children);
        }
      }
    };

    for (let current of newData) {
      if (current.key === popOverKey) loop(current.children);
      else if (current.children)
        this.addIdToNewChildIcon(current.children, popOverKey);
    }
    return newData;
  };

  //给替换节点的children添加icon及其id
  addIdToReplacedChildIcon = (newData, popOverKey) => {
    let loop = (children) => {
      for (let child of children) {
        child.icon = (
          <PopOver
            handleAddClick={this.handleAddClick}
            handleReplaceClick={this.handleReplaceClick}
            handleMouseEnter={this.handleMouseEnter}
            handleDeleteClick={this.handleDeleteClick}
            id={child.key}
          />
        );
        if (child.children) loop(child.children);
      }
    };
    for (let current of newData) {
      if (current.key === popOverKey) {
        if (current.children) loop(current.children);
      } else if (current.children)
        this.addIdToReplacedChildIcon(current.children, popOverKey);
    }
    return newData;
  };

  //获取tree中弹出框对应的树节点
  mapToGetPopOverKey = (currentTarget, data) => {
    for (let item of data) {
      if (item.key === currentTarget.id) {
        this.setState({ popOverKey: item.key });
      } else {
        if (item.children)
          this.mapToGetPopOverKey(currentTarget, item.children);
      }
    }
  };

  //鼠标悬停唤起菜单获取相应树节点
  handleMouseEnter = (e) => {
    const { currentTarget } = e;
    const { gData } = this.state;
    this.mapToGetPopOverKey(currentTarget, gData);
  };

  //替换树节点
  replaceNode = (selectedNode, popOverKey, parents) => {
    for (let node of parents) {
      if (node.key === popOverKey) {
        if (!selectedNode.children) {
          if (node.children) delete node.children;
          node.title = selectedNode.code;
        } else {
          let itemsToAdd = this.getChildrenOfSelectedNode(selectedNode);
          itemsToAdd.key = node.key;
          itemsToAdd.icon = node.icon;
          let index = parents.indexOf(node);
          parents[index] = itemsToAdd;
        }
      } else if (node.children) {
        this.replaceNode(selectedNode, popOverKey, node.children);
      }
    }
    return parents;
  };

  //点击事件
  //点击菜单添加子树节点
  handleAddClick = (e, clickData) => {
    const selectedNode = this.mapToGetNode(e, clickData);
    const { popOverKey, gData } = this.state;
    const newData = this.addChild(popOverKey, gData, selectedNode);
    const newgData = this.addIdToNewChildIcon(newData, popOverKey);
    this.setState({ gData: [...newgData] });
  };

  //点击菜单修改本树节点
  handleReplaceClick = (e, clickData) => {
    const selectedNode = this.mapToGetNode(e, clickData);
    const { popOverKey, gData } = this.state;
    const newData = this.replaceNode(selectedNode, popOverKey, gData);
    const newgData = this.addIdToReplacedChildIcon(newData, popOverKey);
    this.setState({ gData: [...newgData] });
  };

  handleDeleteClick = (e) => {
    e.preventDefault();
    const { popOverKey } = this.state;
    let data = [...this.state.gData];

    let loop = (parents) => {
      for (let node of parents) {
        if (node.key === popOverKey) {
          let index = parents.indexOf(node);
          parents.splice(index, 1);
          break;
        } else if (node.children) {
          loop(node.children);
        }
      }
      return parents;
    };
    let newgData = loop(data);
    this.setState({ gData: [...newgData] });
  };

  onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };

  componentDidMount() {
    let self = this;
    getPromise(systemConfigsUrl, 1, 1000)
      .then(function (response) {
        const { list } = response.data;
        if (list.length > 0) self.setState({ gData: list });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Tree
        className="draggable-tree"
        defaultExpandedKeys={this.state.expandedKeys}
        draggable
        blockNode
        onDragEnter={this.onDragEnter}
        onDrop={this.onDrop}
        treeData={this.state.gData}
        showIcon={true}
      />
    );
  }
}

export default ShowAuthTree;
