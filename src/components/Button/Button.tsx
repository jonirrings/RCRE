import * as React from 'react';
import {CSSProperties} from 'react';
import {IsBoolean, IsDefined, IsString} from 'class-validator';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Button, Popconfirm} from 'antd';
import componentLoader from '../../render/util/componentLoader';
import {ButtonProps} from 'antd/lib/button/button';
import * as _ from 'lodash';
import {ButtonType} from 'antd/lib/button';

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
    buttonType?: 'primary' | 'dashed' | 'danger' | 'ghost' | undefined;

    /**
     * 按钮的HTML类型 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
     * @public
     */
    @IsString()
    htmlType?: 'submit' | 'button' | 'reset';

    /**
     * 设置之后, 会弹出一个确认框, 来确认是否要触发click事件
     */
    confirm?: {
        /**
         * 确认框的描述
         */
        title?: string;

        /**
         * 确认按钮文字
         */
        okText?: string;

        /**
         * 确认按钮类型
         */
        okType?: ButtonType;

        /**
         * 取消按钮文字
         */
        cancelText?: string;
    };

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

    /**
     * 跳转链接
     */
    href?: string;
}

export class ButtonPropsInterface extends BasicContainerPropsInterface {
    info: ButtonConfig;
}

class AbstractButton extends BasicContainer<ButtonPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        let info = this.getPropsInfo(this.props.info);
        let text = info.text;
        let mappedProps = this.mapButtonOptions(info);
        let children;
        let childElement;
        let loading = info.loading;
        
        if (this.props.$data) {
            loading = this.props.$data.get('$loading');
        }
        
        if (info.href) {
            const jump = (event: React.MouseEvent<HTMLAnchorElement>) => {
                event.stopPropagation();
                event.preventDefault();
                window.location.href = info.href!;
            };
            childElement = <a href={info.href} onClick={jump}>{text}</a>;
        } else {
            childElement = text;
        }
        
        let buttonProps: ButtonProps = {
            onMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => {
                this.commonEventHandler('onMouseUp', {
                    event: event
                });
            },
            onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => {
                this.commonEventHandler('onMouseDown', {
                    event: event
                });
            },
            loading: loading,
            ...mappedProps
        };
        
        if (_.isPlainObject(info.confirm)) {
            children = (
                <Popconfirm
                    title={info.confirm!.title}
                    okText={info.confirm!.okText}
                    okType={info.confirm!.okType}
                    cancelText={info.confirm!.cancelText}
                    onConfirm={(event: React.MouseEvent<HTMLDivElement>) => {
                        this.commonEventHandler('onConfirm', {
                            event: event
                        });
                    }}
                    onCancel={(event: React.MouseEvent<HTMLDivElement>) => {
                        this.commonEventHandler('onCancel', {
                            event: event
                        });
                    }}
                >
                    <Button {...buttonProps}>{childElement}</Button>
                </Popconfirm>
            );    
        } else {
            if (info.confirm) {
                console.error('Button confirm props should be plain Object');
            }
            
            buttonProps.onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                this.commonEventHandler('onClick', {
                    event: event
                });
            };

            buttonProps.style = {
                margin: '0 5px'
            };

            children = React.createElement(Button, buttonProps, childElement); 
        }
        
        return this.renderChildren(info, children);
    }

    private mapButtonOptions(info: ButtonConfig): ButtonProps {
        return {
            type: info.buttonType,
            htmlType: info.htmlType,
            icon: info.icon,
            shape: info.shape,
            size: info.size,
            disabled: info.disabled,
            style: info.style,
            prefixCls: info.prefixCls,
            className: info.className,
            ghost: info.ghost,
        };
    }
}

componentLoader.addComponent('button', AbstractButton, ButtonPropsInterface);

export default AbstractButton;