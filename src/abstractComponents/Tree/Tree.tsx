import * as React from 'react';
import {BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import createElement from '../../render/util/createElement';
import * as PropTypes from 'prop-types';
import {IsBoolean} from 'class-validator';
import TreeNode, {TreeNodePropsInterface} from './TreeNode';

export class TreePropsInterface extends ContainerBasicPropsInterface {
    /**
     * 是否展示连接线
     * @public
     */
    @IsBoolean()
    showLine: boolean;

    childNodes: TreeNodePropsInterface[];
}

class AbstractTree extends BasicContainer<TreePropsInterface, {}> {
    static contextTypes = {
        driver: PropTypes.object
    };

    constructor() {
        super();
    }

    render() {
        let driver = this.context.driver;
        let treeInfo = driver.getComponent('tree');

        const loop = (data: TreeNodePropsInterface[]): React.ReactElement<{}>[] => data.map((item, index) => {
            item = Object.assign(item, {
                key: item.key || index
            });

            if (item.childNodes && item.childNodes.length > 0) {
                let children = loop(item.childNodes);

                return createElement(
                    TreeNode,
                    TreeNodePropsInterface,
                    item,
                    children
                );
            }

            return createElement(TreeNode, TreeNodePropsInterface, item);
        });
        
        return createElement(
            treeInfo.component,
            treeInfo.componentInterface,
            this.props,
            loop(this.props.childNodes)
        );
    }
}

export default AbstractTree;