import * as React from 'react';
import {
    BasicConfig,
    BasicContainer, BasicContainerPropsInterface,
    BasicTriggerEvent,
    defaultData
} from '../../render/core/Container/types';
import createElement from '../../render/util/createElement';
import {IsArray, IsBoolean, Validate} from 'class-validator';
import TreeNode, {TreeNodeConfig, TreeNodeMappingConfig, TreeNodePropsInterface} from './TreeNode';
import {IsArrayString, IsCheckedKeys} from '../../render/util/validators';
import * as _ from 'lodash';
import {runInContext} from '../../render/util/vm';
import Trigger from '../../render/core/Trigger/Trigger';

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
    children: defaultData[] & TreeNodeConfig[];

    childMapping?: TreeNodeMappingConfig;
}

export class TreePropsInterface extends BasicContainerPropsInterface {
    info: TreeConfig;

    onCheck: (checkedKeys: Array<string>) => void;
}

export class TreeTriggerEvent extends BasicTriggerEvent {
    model: string;

    checkedKeys: Array<string>;

    selectedKeys: Array<string>;
}

class AbstractTree extends BasicContainer<TreePropsInterface, {}> {
    static defaultProps = {
        onCheck: (checkedKeys: Array<string>) => {
        },
        onSelect: () => {
        }
    };
    
    constructor() {
        super();
    }

    private applyChildMapping(data: TreeNodeConfig): TreeNodeConfig {
        let info = this.props.info;
        let retObj = {
            type: 'treeNode',
            title: '',
            key: '',
            children: []
        };

        if (info.childMapping) {
            _.each<TreeNodeMappingConfig>(info.childMapping, (item: keyof TreeNodeMappingConfig, key: string) => {
                retObj[key] = runInContext(item, {
                    $iterator: {
                        title: data.title,
                        key: data.key,
                        children: data.children
                    },
                    $data: this.props.$data.toObject()
                });
            });
        }

        return retObj;
    }

    render() {
        let children;

        const loop = (data: TreeNodeConfig[]): React.ReactElement<TreeNodePropsInterface>[] =>
            data.map((item, index) => {
                let ret = item;
                if (this.props.info.childMapping) {
                    ret = this.applyChildMapping(item);
                }

                let childProps = {
                    key: ret.key || index,
                    info: ret,
                    onChange: this.props.onChange,
                    $data: this.props.$data,
                    $setData: this.props.$setData,
                    $setDataList: this.props.$setDataList,
                    $removeData: this.props.$removeData
                }; 
                
                if (ret.children && ret.children.length > 0) {
                    return createElement(
                        TreeNode,
                        TreeNodePropsInterface,
                        childProps,
                        loop(ret.children)
                    );
                }
                
                return createElement(TreeNode, TreeNodePropsInterface, childProps);
            });

        if (Array.isArray(this.props.info.children) && this.props.info.children.length > 0) {
            children = loop(this.props.info.children);
        }

        let treeProps = Object.assign({}, this.props, {
            $triggerEvent: TreeTriggerEvent
        });

        return this.renderChildren(React.createElement(Trigger, treeProps, children));
    }
}

export default AbstractTree;