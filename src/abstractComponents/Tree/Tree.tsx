import * as React from 'react';
import {BasicConfig, BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import createElement from '../../render/util/createElement';
import * as PropTypes from 'prop-types';
import {IsArray, IsBoolean, Validate} from 'class-validator';
import TreeNode, {TreeNodeConfig, TreeNodePropsInterface} from './TreeNode';
import {IsArrayString, IsCheckedKeys} from '../../render/util/validators';

export class TreeConfig extends BasicConfig {
    /**
     * 支持点选多个节点（节点本身）
     * @public
     * @default false
     */
    @IsBoolean()
    multiple?: boolean;

    /**
     * 节点前添加 Checkbox 复选框
     * @public
     * @default false
     */
    @IsBoolean()
    checkable?: boolean;

    /**
     * 默认展开所有树节点
     * @public
     * @default false
     */
    @IsBoolean()
    defaultExpandAll?: boolean;

    /**
     * 默认展开指定的树节点
     * @public
     * @default []
     */
    @Validate(IsArrayString)
    defaultExpandedKeys?: string[];

    /**
     * （受控）展开指定的树节点
     * @public
     * @default []
     */
    @Validate(IsArrayString)
    expandedKeys?: string[];

    /**
     * 是否自动展开父节点
     * @public
     * @default true
     */
    @IsBoolean()
    autoExpandParent?: boolean;

    /**
     * 默认选中复选框的树节点
     * @public
     * @default []
     */
    @Validate(IsArrayString)
    defaultCheckedKeys?: string[];

    /**
     * （受控）选中复选框的树节点
     * （注意：父子节点有关联，如果传入父节点key，则子节点自动选中；相应当子节点key都传入，父节点也自动选中。
     * 当设置checkable和checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
     * @public
     * @default []
     */
    @Validate(IsCheckedKeys)
    checkedKeys?: string[] | { checked: string[], halfChecked: string[] };

    /**
     * checkable状态下节点选择完全受控（父子节点选中状态不再关联）
     * @public
     * @default false
     */
    @IsBoolean()
    checkStrictly?: boolean;

    /**
     * 默认选中的树节点
     * @public
     * @default []
     */
    @Validate(IsArrayString)
    defaultSelectedKeys?: string[];

    /**
     * (受控)设置选中的树节点
     * @public
     * @default []
     */
    @Validate(IsArrayString)
    selectedKeys: string[];

    /**
     * 是否展示连接线
     * @public
     * @default false
     */
    @IsBoolean()
    showLine?: boolean;

    @IsBoolean()
    showIcon: boolean;

    @IsArray()
    children: TreeNodeConfig[];
}

export class TreePropsInterface extends ContainerBasicPropsInterface {
    info: TreeConfig;
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

        const loop = (data: TreeNodeConfig[]): React.ReactElement<TreeNodePropsInterface>[] =>
            data.map((item, index) => {
                if (item.children && item.children.length > 0) {
                    let children = loop(item.children);

                    return createElement(
                        TreeNode,
                        TreeNodePropsInterface,
                        {
                            key: item.key || index,
                            info: item
                        },
                        children
                    );
                }

                return createElement(TreeNode, TreeNodePropsInterface, {
                    info: item,
                    key: item.key || index
                });
            });

        return createElement(
            treeInfo.component,
            treeInfo.componentInterface,
            this.props,
            loop(this.props.info.children)
        );
    }
}

export default AbstractTree;