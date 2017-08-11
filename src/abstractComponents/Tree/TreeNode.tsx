import * as React from 'react';
import {BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import createElement from '../../render/util/createElement';
import * as PropTypes from 'prop-types';

export class TreeNodePropsInterface extends ContainerBasicPropsInterface {
    disabled?: boolean;
    disableCheckbox?: boolean;
    title?: string | React.ReactNode;
    key?: string;
    isLeaf?: boolean;
    childNodes?: TreeNodePropsInterface[];
}

class AbstractTreeNode extends BasicContainer<TreeNodePropsInterface, {}> {
    static contextTypes = {
        driver: PropTypes.object
    };
    
    constructor() {
        super();
    }
    
    render() {
        let driver = this.context.driver;
        let componentInfo = driver.getComponent('treeNode');
        
        console.log(this.props.children, this.props);
        
        return createElement(
            componentInfo.component, 
            componentInfo.componentInterface,
            this.props,
            this.props.children
        );    
    }
}

export default AbstractTreeNode;
