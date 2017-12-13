import * as React from 'react';
import {
    BasicConfig, BasicContainer, BasicContainerPropsInterface,
} from '../../render/core/Container/types';
import {IsDefined, IsString} from 'class-validator';
import componentLoader from '../../render/util/componentLoader';
import {Tree} from 'antd';
import {TreeProps} from 'antd/es/tree';

const TreeNode = Tree.TreeNode;

export class TreeConfig extends BasicConfig {
    /**
     * 数据模型Key
     */
    @IsString()
    @IsDefined()
    name: string;

    /**
     * 子节点配置
     */
    options: TreeNodeConfig[];

    /**
     * 自动展开树节点
     */
    autoExpandParent?: boolean;

    /**
     * 支持多选
     */
    checkable?: boolean;

    /**
     * 节点可拖拽
     */
    // draggable?: boolean;
    
    /**
     * 支持点选多个节点（节点本身）
     */
    multiple?: boolean;

    /**
     * 显示连接线
     */
    showLine?: boolean;
}

export class TreeNodeConfig {
    /**
     * 标题
     */
    title: string;

    /**
     * 节点的值
     */
    key: string;

    /**
     * 是否是子节点
     */
    isLeaf?: boolean;

    /**
     * 禁掉 checkbox
     */
    disableCheckbox?: boolean;

    /**
     * 禁用
     */
    disabled?: boolean;

    /**
     * 设置节点是否可被选中
     */
    selectable?: boolean;
    
    /**
     * 子节点
     */
    children?: TreeNodeConfig[];
}

export class TreePropsInterface extends BasicContainerPropsInterface {
    info: TreeConfig;
}

export class AbstractTree extends BasicContainer<TreePropsInterface, {}> {
    constructor() {
        super();
        
        this.handleSelect = this.handleSelect.bind(this);
    }
    
    private handleSelect(selectedKeys: Array<string>) {
        if (this.props.$setData && this.props.info.name) {
            this.props.$setData(this.props.info.name, selectedKeys);
        }
        
        this.commonEventHandler('onSelect', {
            selectedKeys
        });
    }
    
    private renderTreeNode(options: TreeNodeConfig[]): React.ReactNode[] {
        return options.map(op => {
            let title = op.title;
            let key = op.key;
            let isLeaf = op.isLeaf;
            let disabled = op.disabled;
            let disabledCheckbox = op.disableCheckbox;
            let selectable = typeof op.selectable === 'boolean' ? op.selectable : true;
            let children;
            
            if (op.children) {
                children = this.renderTreeNode(op.children);
            }
            
            return React.createElement(TreeNode, {
                title,
                key,
                isLeaf,
                disabled,
                selectable,
                disabledCheckbox
            }, children);
        });
    }
    
    private mapTreeOptions(info: TreeConfig): TreeProps {
        return {
            className: info.className,
            style: info.style,
            autoExpandParent: info.autoExpandParent || true,
            checkable: info.checkable,
            multiple: info.multiple,
            showLine: info.showLine
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info);
        
        if (!info.name) {
            return this.errorReport('name property is required for tree element', 'div');
        }
        
        if (!this.props.$data) {
            return this.errorReport('tree component should be under container component', 'div');
        }
        
        let options: TreeNodeConfig[] = info.options;
        
        if (!info.options || !(info.options instanceof Array)) {
            options = [];
        }
        
        let treeNodes = this.renderTreeNode(options);
        
        let treeOptions = this.mapTreeOptions(info);
        
        return (
            <Tree
                {...treeOptions}
                onCheck={(checkedKeys: Array<string>) => {
                    this.commonEventHandler('onCheck', {
                        checkedKeys
                    });
                }}
                onSelect={this.handleSelect}
            >
                {treeNodes}
            </Tree>
        );
    }
}

componentLoader.addComponent('tree', AbstractTree, TreePropsInterface);