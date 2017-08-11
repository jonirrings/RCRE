import * as React from 'react';
import {Tree} from 'antd';
import {TreeNodePropsInterface} from '../../../../abstractComponents/Tree/TreeNode';
import {AntTreeNodeProps} from 'antd/lib/tree';

const TreeNode = Tree.TreeNode;

function mapTreeOptions(props: TreeNodePropsInterface): AntTreeNodeProps {
    return Object.assign({}, props, {
        disabled: props.disabled,
        disableCheckbox: props.disableCheckbox,
        title: props.title,
        key: props.key,
        isLeaf: props.isLeaf
    });
}

export default class AntTreeNode extends React.Component<TreeNodePropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let mergeProps = mapTreeOptions(this.props);
        console.log(this.props.children);
        return React.createElement(
            TreeNode,
            mergeProps,
            this.props.children
        );
    }
}