import * as React from 'react';
import {IsString, IsDefined, IsBoolean} from 'class-validator';
import {BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import * as PropTypes from 'prop-types';

export class ButtonPropsInterface extends ContainerBasicPropsInterface {
    /**
     * 按钮的文字
     * @public
     */
    @IsString()
    @IsDefined()
    label: string;

    /**
     * 按钮的类型
     * @public
     */
    @IsString()
    buttonType: 'primary' | 'dashed' | 'danger' | 'ghost' | undefined;

    /**
     * 按钮的点击回调
     * @private
     */
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

    /**
     * 按钮的HTML类型 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
     * @public
     */
    @IsString()
    htmlType: 'submit' | 'button' | 'reset';

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
}

class Button extends BasicContainer<ButtonPropsInterface, {}> {
    static defaultProps = {
        onClick: () => {
            console.error('Button onClick 没有实现');
        },

        label: ''
    };

    static contextTypes = {
        driver: PropTypes.object
    };

    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let driver = this.context.driver;
        let componentInfo = driver.getComponent('button');
        let Component = componentInfo.component;
        return React.createElement(Component, this.props);
    }

    private handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.onClick(e);
    }
}

export default Button;