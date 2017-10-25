import * as React from 'react';
import {IsBoolean, IsDefined, IsString} from 'class-validator';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Button} from 'antd';
import componentLoader from '../../render/util/componentLoader';
import {CSSProperties} from 'react';
import {ButtonProps} from 'antd/lib/button/button';

export class ButtonConfig extends BasicConfig {
    /**
     * 按钮的文字
     * @public
     */
    @IsString()
    @IsDefined()
    text: string;

    /**
     * 按钮的类型
     * @public
     */
    @IsString()
    'antd.type'?: 'primary' | 'dashed' | 'danger' | 'ghost' | undefined;

    /**
     * 按钮的HTML类型 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
     * @public
     */
    @IsString()
    htmlType?: 'submit' | 'button' | 'reset';

    /**
     * 设置之后, 会弹出一个确认框, 来确认是否要触发click事件
     */
    @IsString()
    confirm?: string;

    /**
     * 按钮的图标类型
     * @public
     */
    @IsString()
    icon?: string;

    /**
     * 按钮形态
     * @public
     */
    @IsString()
    shape?: 'circle' | 'circle-outline' | undefined;

    /**
     * 按钮大小
     * @public
     */
    @IsString()
    size?: 'small' | 'large' | undefined;

    /**
     * 加载形态
     * @public
     */
    @IsBoolean()
    loading?: boolean;

    /**
     * 按钮背景透明
     * @public
     */
    @IsBoolean()
    ghost?: boolean;

    /**
     * 是否禁用
     * @public
     */
    @IsBoolean()
    disabled?: boolean;

    /**
     * unknown
     */
    @IsString()
    prefixCls?: string;
    
    /**
     * CSS class
     */
    @IsString()
    className?: string;
    
    /**
     * 内联CSS属性
     */
    style?: CSSProperties;

}

export class ButtonPropsInterface extends BasicContainerPropsInterface {
    info: ButtonConfig;
}

class AbstractButton extends BasicContainer<ButtonPropsInterface, {}> {
    constructor() {
        super();
    }
    
    private mapButtonOptions(info: ButtonConfig): ButtonProps {
        return {
            type: info['antd.type'],
            htmlType: info.htmlType,
            icon: info.icon,
            shape: info.shape,
            size: info.size,
            loading: info.loading,
            disabled: info.disabled,
            style: info.style,
            prefixCls: info.prefixCls,
            className: info.className,
            ghost: info.ghost,
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info);
        let text = info.text;

        let buttonProps = this.mapButtonOptions(info);
        let children = React.createElement(Button, {
            // TODO: trigger Interface inject
            onClick: () => {},
            onMouseUp: () => {},
            onMouseDown: () => {},
            ...buttonProps
        }, text);
        return this.renderChildren(info, children);
    }
}

componentLoader.addComponent('button', AbstractButton, ButtonPropsInterface);

export default AbstractButton;