import * as React from 'react';
import {
    BasicConfig,
    BasicContainer,
    ContainerBasicPropsInterface,
    defaultData
} from '../../render/core/Container/types';
import createElement from '../../render/util/createElement';
import * as PropTypes from 'prop-types';
import {IsArray, IsBoolean, IsString} from 'class-validator';

export class TreeNodeConfig extends BasicConfig {
    @IsString()
    title: string | React.ReactNode;

    @IsString()
    key: string;

    @IsArray()
    children: defaultData[] & TreeNodeConfig[];

    @IsBoolean()
    disabled?: boolean;

    @IsBoolean()
    disableCheckbox?: boolean;

    @IsBoolean()
    isLeaf?: boolean;
}

export class TreeNodeMappingConfig {
    @IsString()
    title: string;

    @IsString()
    key: string;

    @IsString()
    children: string;

    @IsString()
    disabled: string;

    @IsString()
    disableCheckbox: string;

    @IsString()
    isLeaf: string;
}

export class TreeNodePropsInterface extends ContainerBasicPropsInterface {
    info: TreeNodeConfig;
}

class AbstractTreeNode extends BasicContainer<TreeNodePropsInterface, {}> {
    static contextTypes = {
        driver: PropTypes.object
    };

    static isTreeNode: boolean;
    
    constructor() {
        super();
    }
    
    render() {
        let driver = this.context.driver;
        let componentInfo = driver.getComponent('treeNode');
        
        return createElement(
            componentInfo.component, 
            componentInfo.componentInterface,
            this.props,
            this.props.children
        );
    }
}

// 为了兼容rc-tree非常恶心的实现方式
// https://github.com/react-component/tree/blob/master/src/TreeNode.jsx#L187
AbstractTreeNode.isTreeNode = true;

export default AbstractTreeNode;
