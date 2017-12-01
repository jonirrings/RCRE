import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Popover} from 'antd';
import {createChild} from '../../render/util/createChild';
import componentLoader from '../../render/util/componentLoader';

export class PopoverConfig extends BasicConfig {
    /**
     * Popover数据模型Key
     */
    name?: string;

    /**
     * 弹出框位置
     */
    placement: 'topLeft' | 'top' | 'topRight'
        | 'left' | 'leftTop' | 'leftBottom'
        | 'rightTop' | 'right' | 'rightBottom'
        | 'bottomLeft' | 'bottom' | 'bottomRight';

    /**
     * 弹出框标题
     */
    title?: string;

    /**
     * 弹出框内容
     */
    content?: string | BasicConfig;

    /**
     * 触发类型
     */
    triggerType: 'hover' | 'focus' | 'click';

    /**
     * 渲染的子级元素
     */
    children: BasicConfig[];
}

export class PopoverPropsInterface extends BasicContainerPropsInterface {
    info: PopoverConfig;
}

export class AbstractPopover extends BasicContainer<PopoverPropsInterface, {}> {
    constructor() {
        super();

        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    handleVisibleChange(visible: boolean) {
        if (this.props.$setData && this.props.info.name) {
            this.props.$setData(this.props.info.name, visible);
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info, this.props, ['content']);

        if (!info.children || !(info.children instanceof Array)) {
            return this.errorReport('children property is required, Popover component ' +
                'should be mount on some component', 'div');
        }

        let extendProps: {
            [s: string]: any
        } = {};

        if (info.name && this.props.$data) {
            extendProps.visible = this.props.$data.get(info.name) || false;
        }

        let content;

        if (typeof info.content === 'object' && info.content.type) {
            content = createChild(info.content, this.getChildProps(info.content, {}));
        } else {
            content = info.content;
        }

        let children = info.children.map((child, index) => createChild(child, this.getChildProps(child, {
            key: `pop_over_child_${index}`
        })));

        return (
            <Popover
                title={info.title}
                content={content}
                placement={info.placement}
                trigger={info.triggerType}
                onVisibleChange={this.handleVisibleChange}
                {...extendProps}
            >
                {children}
            </Popover>
        );
    }
}

componentLoader.addComponent('popover', AbstractPopover, PopoverPropsInterface);