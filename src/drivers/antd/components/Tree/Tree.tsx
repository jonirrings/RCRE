import * as React from 'react';
import {Tree} from 'antd';
import {TreeConfig, TreePropsInterface} from '../../../../abstractComponents/Tree/Tree';
import {TreeProps} from 'antd/lib/tree';
import * as _ from 'lodash';

export class AntTree extends React.Component<TreePropsInterface & TreeConfig, {}> {
    constructor() {
        super();
    }

    private mapTreeOptions(props: TreePropsInterface & TreeConfig): TreeProps {
        let newProps = {};

        _.each(props.info, (item, key) => {
            if (typeof props.info[key] !== 'undefined') {
                newProps[key] = item;
            }
        });

        return newProps;
    }
    
    render() {
        return React.createElement(Tree, this.mapTreeOptions(this.props), this.props.children);
    }
}

export default AntTree;