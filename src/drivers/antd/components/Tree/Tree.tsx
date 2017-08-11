import * as React from 'react';
import {Tree} from 'antd';
import {TreePropsInterface} from '../../../../abstractComponents/Tree/Tree';
import {TreeProps} from 'antd/lib/tree';

export class AntTree extends React.Component<TreePropsInterface, {}> {
    constructor() {
        super();
    }

    private mapTreeOptions(props: TreePropsInterface): TreeProps {
        return Object.assign({}, props, {
            showLine: props.showLine,
            defaultExpandAll: true
        });
    }
    
    render() {
        return React.createElement(Tree, this.mapTreeOptions(this.props), this.props.children);
    }
}

export default AntTree;