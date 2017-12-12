import * as React from 'react';
import {CSSProperties} from 'react';
import {IsBoolean, IsDefined, IsString, Validate} from 'class-validator';
import {IsValidEnums} from '../../render/util/validators';
import {Icon, Input} from 'antd';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import componentLoader from '../../render/util/componentLoader';
import {InputProps} from 'antd/lib/input/Input';

export class InputConfig extends BasicConfig {
    /**
     * Input的数据模型Key
     */
    @IsDefined()
    name: string;

    /**
     * 输入框类型
     * @public
     * @default text
     */
    @Validate(IsValidEnums, ['text', 'number', 'password', 'email', 'search'])
    inputType: 'text' | 'number' | 'password' | 'email' | 'search';

    /**
     * 输入框ID
     * @public
     * @default ''
     */
    @IsString()
    id: string;

    /**
     * 空间大小
     * @public
     * @default 'default'
     */
    @IsString()
    size: 'default' | 'large' | 'small';

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled: boolean;

    /**
     * 带标签的 input，设置前置标签
     * @public
     * @default ''
     */
    @IsString()
    addonBefore: string;

    /**
     * 带标签的 input，设置后置标签
     * @public
     * @default ''
     */
    @IsString()
    addonAfter: string;

    /**
     * 没有输入展示的文字
     */
    @IsString()
    placeholder?: string;

    /**
     * 是否可读
     */
    @IsBoolean()
    readOnly?: boolean;

    /**
     * 前置图标
     */
    @IsString()
    prefix?: string;

    /**
     * 后置图标
     */
    @IsString()
    suffix?: string;

    /**
     * 文字检查
     */
    @IsBoolean()
    spellCheck?: boolean;

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
     * 自动聚焦
     */
    @IsBoolean()
    autoFocus?: boolean;
}

export class InputPropsInterface extends BasicContainerPropsInterface {
    info: InputConfig;
}

export interface InputStateInterface {
    hasError: boolean;
}

class AbstractInput extends BasicContainer<InputPropsInterface, InputStateInterface> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, value);
        }
    }

    private mapOptions(info: InputConfig): InputProps {
        return {
            placeholder: info.placeholder,
            type: info.inputType,
            id: info.id,
            name: info.name,
            size: info.size,
            disabled: info.disabled,
            readOnly: info.readOnly,
            addonBefore: info.addonBefore,
            addonAfter: info.addonAfter,
            autoComplete: 'off',
            prefix: info.prefix && <Icon type={info.prefix} />,
            suffix: info.suffix && <Icon type={info.suffix} />,
            spellCheck: info.spellCheck,
            autoFocus: info.autoFocus,
            className: info.className,
            style: info.style
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        if (!info.name) {
            return <div>name property is required for Input Element</div>;
        }
        
        if (!this.props.$data) {
            console.log('Input Element is out of RCRE control, please put it inside container component');
            return <Input/>;
        }

        let $data = this.props.$data;
        let value = $data.get(info.name);

        let inputProps = this.mapOptions(info);
        let inputElement = React.createElement(Input, {
            value: value,
            onChange: this.handleChange,
            // TODO: Add Trigger interface
            onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => {
                this.commonEventHandler('onPressEnter', {
                    event: event
                });
            },
            onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                this.commonEventHandler('onKeyDown', {
                    event: event
                });
            },
            onClick: (event: React.MouseEvent<HTMLInputElement>) => {
                this.commonEventHandler('onClick', {
                    event: event
                });
            },
            onFocus: (event: React.MouseEvent<HTMLInputElement>) => {
                this.commonEventHandler('onFocus', {
                    event: event
                });
            },
            onBlur: (event: React.MouseEvent<HTMLInputElement>) => {
                this.commonEventHandler('onBlur', {
                    event: event
                });
            },
            ...inputProps
        });

        return (
            <div className="ant-form-item-control">
                {inputElement}
            </div>
        );
    }
}

componentLoader.addComponent('input', AbstractInput, InputPropsInterface);

export default AbstractInput;