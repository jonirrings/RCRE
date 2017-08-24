import * as React from 'react';
import {Layout} from 'antd';
import createElement from '../../../util/createElement';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../../util/validators';
import {BasicProps} from 'antd/lib/layout/layout';
import {BasicConfig} from '../../Container/types';
import {createChild} from '../../../util/createChild';

export class LayoutConfig {
    /**
     * 自定义样式属性
     */
    style?: React.CSSProperties;

    children: BasicConfig[];
}

export class LayoutPropsInterface {
    @Validate(IsPageInfo, [LayoutConfig])
    info: LayoutConfig;
}

export default class AbstractLayout<T extends LayoutPropsInterface> extends React.Component<T, {}> {
    constructor() {
        super();
    }

    private mapOptions(props: LayoutConfig): BasicProps {
        return {
            style: Object.assign({
                background: '#fff'
            }, props.style)
        };
    }

    render() {
        let children;

        if (Array.isArray(this.props.info.children)) {
            children = this.props.info.children.map((item, index) => {
                return createChild(item, {
                    info: item,
                    key: index
                }, this.context.form);
            });
        }

        return createElement(Layout, LayoutPropsInterface, this.mapOptions(this.props.info), children);
    }
}