import * as React from 'react';
import {BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import createElement from '../../render/util/createElement';
import * as PropTypes from 'prop-types';
import {IsArray, IsBoolean, IsString} from 'class-validator';

export class TreeNodePropsInterface extends ContainerBasicPropsInterface {
    @IsBoolean()
    disabled?: boolean;
    
    @IsBoolean()
    disableCheckbox?: boolean;
    
    @IsString()
    title?: string | React.ReactNode;
    
    @IsString()
    key?: string;
    
    @IsBoolean()
    isLeaf?: boolean;
    
    @IsArray()
    childNodes?: TreeNodePropsInterface[];
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
