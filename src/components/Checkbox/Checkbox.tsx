import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean, IsDefined, IsString} from 'class-validator';
import componentLoader from '../../render/util/componentLoader';
import {Checkbox} from 'antd';
import {CheckboxProps} from 'antd/lib/checkbox/Checkbox';
import {CSSProperties} from 'react';

export class CheckboxConfig extends BasicConfig {
    /**
     * Checkbox的数据模型Key
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
    disabled?: boolean;

    /**
     * 文字
     * @public
     * @default ''
     */
    @IsString()
    text?: string;

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

export class CheckboxPropsInterface extends BasicContainerPropsInterface {
    info: CheckboxConfig;
}

export default class AbstractCheckbox extends BasicContainer<CheckboxPropsInterface, {}> {
    constructor() {
        super();
        
        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let checked = event.target.checked;
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, checked);
        }
    }

    private mapOptions(info: CheckboxConfig): CheckboxProps {
        return {
            prefixCls: info.prefixCls,
            className: info.className,
            defaultChecked: info.defaultChecked,
            style: info.style,
            disabled: info.disabled
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info);
        
        if (!info.name) {
            return <div>name property is required for Checkbox Element</div>;
        }

        if (!this.props.$data) {
            console.log('Checkbox Element is out of RCRE control, please put it inside container component');
            return <Checkbox/>;
        }

        let $data = this.props.$data;
        let value = $data.get(info.name);

        let checkboxProps = this.mapOptions(info);
        return React.createElement(Checkbox, {
            checked: value,
            onChange: this.handleChange,
            // TODO Trigger Interface inject
            onMouseEnter: () => {},
            onMouseLeave: () => {},
            ...checkboxProps
        }, info.text);
    }
}

componentLoader.addComponent('checkbox', AbstractCheckbox, CheckboxPropsInterface);