import * as React from 'react';
import {CSSProperties} from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean, IsDefined, IsJSON, IsString} from 'class-validator';
import componentLoader from '../../render/util/componentLoader';
import {Radio} from 'antd';
import {RadioGroupProps} from 'antd/lib/radio';
import {RadioProps} from 'antd/es/radio';

const RadioGroup = Radio.Group;

export class RadioOptionItem {
    /**
     * 多组单选按钮的文字
     */
    label: string;

    /**
     * 多组单选按钮的值
     */
    value: string;
}

export class RadioConfig extends BasicConfig {
    /**
     * Radil的数据模型Key
     */
    @IsDefined()
    name: string;

    /**
     * 初始是否选中
     * @public
     * @default false
     */
    @IsBoolean()
    defaultChecked?: boolean;

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled: boolean;

    /**
     * unknown
     */
    @IsString()
    prefixCls?: string;
    
    /**
     * 单个选择框的文字
     * @public
     * @default ''
     */
    @IsString()
    text?: string;

    /**
     * 多组单选按钮.
     */
    options?: RadioOptionItem[];

    /**
     * CSS class
     */
    @IsString()
    className?: string;

    /**
     * RadioGroup中, 按钮的大小
     */
    size: 'large' | 'default' | 'small';
    
    /**
     * 内联CSS属性
     */
    @IsJSON()
    style?: CSSProperties;
}

export class RadioPropsInterface extends BasicContainerPropsInterface {
    info: RadioConfig;
}

export class AbstractRadio extends BasicContainer<RadioPropsInterface, {}> {
    constructor() {
        super();
        
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);
    }

    private mapOptions(info: RadioConfig): RadioProps {
        return {
            prefixCls: info.prefixCls,
            className: info.className,
            style: info.style,
            disabled: info.disabled
        };
    }
    
    private mapRadioGroupOptions(info: RadioConfig): RadioGroupProps {
        return {
            size: info.size,
            name: info.name,
        };
    }
    
    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let checked = event.target.checked;
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, checked);
        }
    }
    
    private handleRadioGroupChange(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, value);
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        if (!info.name) {
            return <div>name property is required for Radio Element</div>;
        }

        if (!this.props.$data) {
            return <div>Radio Element is out of RCRE control, please put it inside container component</div>;
        }

        let $data = this.props.$data;
        let value = $data.get(info.name);
        
        // 单个Radio选择模式
        if (info.options) {
            let radioGroupProps = this.mapRadioGroupOptions(info);
            return React.createElement(RadioGroup, {
                value: value,
                onChange: this.handleRadioGroupChange,
                onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => {
                    this.commonEventHandler('onMouseEnter', {
                        event: event
                    });
                },
                onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => {
                    this.commonEventHandler('onMouseLeave', {
                        event: event
                    });
                },
                options: info.options,
                ...radioGroupProps
            });
        } else {
            let radioProps = this.mapOptions(info);
            return React.createElement(Radio, {
                checked: value,
                onChange: this.handleChange,
                onMouseEnter: (event: React.MouseEvent<HTMLInputElement>) => {
                    this.commonEventHandler('onMouseEnter', {
                        event: event
                    });
                },
                onMouseLeave: (event: React.MouseEvent<HTMLInputElement>) => {
                    this.commonEventHandler('onMouseLeave', {
                        event: event
                    });
                },
                ...radioProps
            }, info.text);   
        }
    }
}

componentLoader.addComponent('radio', AbstractRadio, RadioPropsInterface);