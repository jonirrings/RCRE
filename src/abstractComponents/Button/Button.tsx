import * as React from 'react';
import {IsBoolean, IsDefined, IsString} from 'class-validator';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import Col, {hasColProps} from '../../render/core/Layout/Col/Col';
import Trigger from '../../render/core/Trigger/Trigger';

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
    buttonType: 'primary' | 'dashed' | 'danger' | 'ghost' | undefined;

    /**
     * 按钮的HTML类型 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
     * @public
     */
    @IsString()
    htmlType: 'submit' | 'button' | 'reset';

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
    icon: string;

    /**
     * 按钮形态
     * @public
     */
    @IsString()
    shape: 'circle' | 'circle-outline' | undefined;

    /**
     * 按钮大小
     * @public
     */
    @IsString()
    size: 'small' | 'large' | undefined;

    /**
     * 加载形态
     * @public
     */
    @IsBoolean()
    loading: boolean;

    /**
     * 按钮背景透明
     * @public
     */
    @IsBoolean()
    ghost: boolean;

    /**
     * 是否禁用
     * @public
     */
    disabled: boolean;
}

export class ButtonPropsInterface extends BasicContainerPropsInterface {
    info: ButtonConfig;

    /**
     * 按钮的点击回调
     * @private
     */
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

class AbstractButton extends BasicContainer<ButtonPropsInterface, {}> {
    static defaultProps = {
        onClick: () => {
            console.log('clicked');
        }
    };

    constructor() {
        super();
    }

    render() {
        let props = this.props;

        let children = React.createElement(Trigger, props);

        if (hasColProps(props.info)) {
            children = React.createElement(Col, {
                info: this.props.info
            }, children);
        }

        return this.renderChildren(children);
    }
}

export default AbstractButton;