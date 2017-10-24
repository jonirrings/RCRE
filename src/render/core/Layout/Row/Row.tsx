import * as React from 'react';
import * as _ from 'lodash';
import componentLoader from '../../../util/componentLoader';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../Container/types';
import {createChild} from '../../../util/createChild';

export class RowConfig extends BasicConfig {
    /**
     * 每行最小高度
     */
    minHeight?: string;

    /**
     * 内容行高
     */
    lineHeight?: string;
}

export class RowPropsInterface extends BasicContainerPropsInterface {
    info: RowConfig;
}

export default class Row extends BasicContainer<RowPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let info = this.getPropsInfo(this.props.info);
        let children = info.children;
        
        if (!_.isArray(children)) {
            return <div>children props is required in Row Component</div>;
        }
        
        let childElements = children.map((child, index) => {
            return createChild(child, {
                info: child,
                $data: this.props.$data,
                key: `row_${child.type}_${index}`,
                onChange: this.props.onChange
            });
        });
        
        const rowStyles = {
            display: 'flex',
            minHeight: info.minHeight || '30px',
            lineHeight: info.lineHeight || '30px'
        };
        
        return (
            <div style={rowStyles}>
                {childElements}
            </div>
        );
    }
}

componentLoader.addComponent('row', Row, RowPropsInterface);