import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean, IsDefined, IsJSON, IsString} from 'class-validator';
import componentLoader from '../../render/util/componentLoader';
import {Radio} from 'antd';
import {RadioProps} from 'antd/lib/radio/radio';
import {CSSProperties} from 'react';

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
     * 文字
     * @public
     * @default ''
     */
    @IsString()
    text?: string;

    /**
     * CSS class
     */
    @IsString()
    className?: string;

    /**
     * 内联CSS属性
     */
    @IsJSON()
    style?: CSSProperties;
}

export class RadioPropsInterface extends BasicContainerPropsInterface {
    info: RadioConfig;
}

//
export class AbstractRadio extends BasicContainer<RadioPropsInterface, {}> {
    constructor() {
        super();
        
        this.handleChange = this.handleChange.bind(this);
    }

    private mapOptions(info: RadioConfig): RadioProps {
        return {
            prefixCls: info.prefixCls,
            className: info.className,
            style: info.style,
            disabled: info.disabled
        };
    }
    
    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let checked = event.target.checked;
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, checked);
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
        
        let radioProps = this.mapOptions(info);
        return React.createElement(Radio, {
            checked: value,
            onChange: this.handleChange,
            // TODO Trigger Interface inject
            onMouseEnter: () => {},
            onMouseLeave: () => {},
            ...radioProps
        }, info.text);
    }
}

componentLoader.addComponent('radio', AbstractRadio, RadioPropsInterface);