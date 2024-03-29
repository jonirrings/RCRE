// import * as React from 'react';
// import {
//     BasicConfig,
//     BasicContainer,
//     BasicContainerPropsInterface,
//     defaultData
// } from '../../render/core/Container/types';
// import createElement from '../../render/util/createElement';
// import {IsArray, IsBoolean, IsString} from 'class-validator';
//
// export class TreeNodeConfig extends BasicConfig {
//     @IsString()
//     title: string | React.ReactNode;
//
//     @IsString()
//     key: string;
//
//     @IsArray()
//     children: defaultData[] & TreeNodeConfig[];
//
//     @IsBoolean()
//     disabled?: boolean;
//
//     @IsBoolean()
//     disableCheckbox?: boolean;
//
//     @IsBoolean()
//     isLeaf?: boolean;
// }
//
// export class TreeNodeMappingConfig {
//     @IsString()
//     title: string;
//
//     @IsString()
//     key: string;
//
//     @IsString()
//     children: string;
//
//     @IsString()
//     disabled: string;
//
//     @IsString()
//     disableCheckbox: string;
//
//     @IsString()
//     isLeaf: string;
// }
//
// export class TreeNodePropsInterface extends BasicContainerPropsInterface {
//     info: TreeNodeConfig;
// }
//
// class AbstractTreeNode extends BasicContainer<TreeNodePropsInterface, {}> {
//     static isTreeNode: boolean;
//    
//     constructor() {
//         super();
//     }
//    
//     render() {
//         let driver = this.context.driver;
//         let componentInfo = driver.getComponent('treeNode');
//        
//         return createElement(
//             componentInfo.component, 
//             componentInfo.componentInterface,
//             this.props,
//             this.props.children
//         );
//     }
// }
//
// // 为了兼容rc-tree非常恶心的实现方式
// // 需要让AbstractTreeNode也被AntTree当作是AntTreeNode. 这样才能拿到要传递给下层所需要的属性值
// // https://github.com/react-component/tree/blob/master/src/TreeNode.jsx#L187
// AbstractTreeNode.isTreeNode = true;
//
// export default AbstractTreeNode;
