// import * as React from 'react';
// import {Tree} from 'antd';
// import {TreeNodeConfig, TreeNodePropsInterface} from '../../../../components/Tree/TreeNode';
// import {AntTreeNodeProps} from 'antd/lib/tree';
//
// const TreeNode = Tree.TreeNode;
//
// function mapTreeOptions(props: TreeNodePropsInterface): AntTreeNodeProps {
//     return Object.assign({}, props, {
//         disabled: props.info.disabled,
//         disableCheckbox: props.info.disableCheckbox,
//         title: props.info.title,
//         key: props.info.key,
//         isLeaf: props.info.isLeaf
//     });
// }
//
// export default class AntTreeNode extends React.Component<TreeNodePropsInterface & TreeNodeConfig, {}> {
//     constructor() {
//         super();
//     }
//
//     render() {
//         let mergeProps = mapTreeOptions(this.props);
//
//         return React.createElement(
//             TreeNode,
//             mergeProps,
//             this.props.children
//         );
//     }
// }