import * as React from 'react';
import {Tree} from 'antd';
import {TreePropsInterface} from '../../../../abstractComponents/Tree/Tree';
import {AntTreeNodeEvent, TreeProps} from 'antd/lib/tree';
import * as _ from 'lodash';

export class AntTree extends React.Component<TreePropsInterface, {}> {
    constructor() {
        super();

        this.handleSelect = this.handleSelect.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleSelect(checkedKeys: Array<string>, e: AntTreeNodeEvent) {
    }

    handleCheck(checkedKeys: Array<string>, e: AntTreeNodeEvent) {
        this.props.onCheck(checkedKeys);
    }

    render() {
        return React.createElement(Tree, Object.assign(this.mapTreeOptions(this.props), {
            onSelect: this.handleSelect,
            onCheck: this.handleCheck
        }), this.props.children);
    }

    private mapTreeOptions(props: TreePropsInterface): TreeProps {
        let newProps = {};

        _.each(props.info, (item, key) => {
            if (typeof props.info[key] !== 'undefined') {
                newProps[key] = item;
            }
        });

        return newProps;
    }
}

export default AntTree;