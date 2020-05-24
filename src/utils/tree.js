/**
 * @param {*} nodes TreeNode 节点
 * @param {function(*): boolean} match 过滤条件
 * @param {function(): boolean} shouldTerminateFunc 终止条件
 */
const filterNodes = (nodes, match = null, shouldTerminateFunc = null) => {
    if (!match) {
        match = (node) => true
    }
    if (!shouldTerminateFunc) {
        shouldTerminateFunc = () => false
    }

    let result = [];

    function search(nodes) {
        if (shouldTerminateFunc()) {
            return;
        }
        for (let node of nodes) {
            if (match(node)) {
                result.push(node);
            }
            if (node.children) {
                search(node.children);
            }
        }
    }

    search(nodes);
    return result;
}

const filterNodesByKeys = (nodes, keys) => {
    const keySet = new Set(keys);
    return filterNodes(
        nodes,
        node => {
            const has = keySet.has(node.key)
            if (has) {
                keySet.delete(node.key)
            }
            return has;
        },
        () => keySet.size === 0);
}


export {filterNodes, filterNodesByKeys}