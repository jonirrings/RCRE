import * as React from 'react';
import {BasicProps} from 'antd/lib/layout/layout';
import {createChild} from '../../../util/createChild';
import {BasicConfig} from '../../Container/types';
import createElement from '../../../util/createElement';

export class BasicLayoutConfig {
    /**
     * 自定义样式属性
     */
    style?: React.CSSProperties;

    children: BasicConfig[];
}

export class BasicLayoutPropsInterface {
    info: BasicLayoutConfig;
}

export class BasicAbstractLayout<T extends BasicLayoutPropsInterface, S> extends React.Component<T, S> {
    constructor() {
        super();
    }

    public mapOptions(props: BasicLayoutConfig): BasicProps {
        return {
            style: props.style
        };
    }

    public renderComponent(Component: React.ComponentClass<BasicProps>, componentInterface: Object) {
        let children;

        if (Array.isArray(this.props.info.children)) {
            children = this.props.info.children.map((info, index) => {
                return createChild(info, {
                    info: info,
                    key: index
                }, this.context.form);
            });
        }

        return createElement(Component, componentInterface, this.mapOptions(this.props.info), children);
    }
}