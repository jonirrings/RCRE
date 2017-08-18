import * as React from 'react';
import {IsBoolean, IsDefined, IsString} from 'class-validator';
import {BasicConfig, BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import * as PropTypes from 'prop-types';
import {DriverController} from '../../drivers/index';

export class ButtonConfig extends BasicConfig {
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

export class ButtonPropsInterface extends ContainerBasicPropsInterface {
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
            console.error('Button onClick 没有实现');
        }
    };

    static contextTypes = {
        driver: PropTypes.object
    };

    constructor() {
        super();

        // this.handleClick = this.handleClick.bind(this);
    }
    
    // private handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    //     e.preventDefault();
    //     this.props.onClick(e);
    // }
    //
    render() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            console.error(`can not find component: ${this.props.info.type}`);
            return <div/>;
        }
        
        let Component = componentInfo.component;
        return React.createElement(Component, this.props, this.props.info.label);
    }
}

export default AbstractButton;