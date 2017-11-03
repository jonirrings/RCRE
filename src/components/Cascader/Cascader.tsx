import * as React from 'react';
import componentLoader from '../../render/util/componentLoader';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean, IsDefined, IsString} from 'class-validator';
import {CSSProperties} from 'react';
import {CascaderProps, CascaderOptionType} from 'antd/lib/cascader';
import {Cascader} from 'antd';

export class CascaderConfig extends BasicConfig {
    /**
     * Checkbox的数据模型Key
     */
    @IsDefined()
    name: string;

    /**
     * 是否支持清除
     */
    allowClear?: boolean;

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
     * 禁用
     */
    @IsBoolean()
    disabled?: boolean;

    /**
     * 次级菜单的展开方式，可选 'click' 和 'hover'
     */
    expandTrigger?: 'click' | 'hover';

    /**
     * 可选项数据源
     */
    options: CascaderOptionType[];

    /**
     * 自定义浮层类名
     */
    popupClassName?: string;

    /**
     *  浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight`
     */
    popupPlacement?: string;

    /**
     * 输入框占位文本
     */
    placeholder?: string;

    /**
     * 输入框大小，可选 `large` `default` `small`
     */
    size?: string;

    /**
     * 在选择框中显示搜索框
     */
    showSearch?: boolean;
}

export class CascaderPropsInterface extends BasicContainerPropsInterface {
    info: CascaderConfig;
}

export class AbstractCascader extends BasicContainer<CascaderPropsInterface, {}> {
    constructor() {
        super();
        
        this.handleChange = this.handleChange.bind(this);
    }

    private mapCascaderOptions(info: CascaderConfig): CascaderProps {
        return {
            style: info.style,
            className: info.className,
            popupClassName: info.popupClassName,
            popupPlacement: info.popupPlacement,
            placeholder: info.placeholder,
            size: info.size,
            disabled: info.disabled,
            allowClear: info.allowClear,
            expandTrigger: info.expandTrigger,
            showSearch: info.showSearch,
            options: []
        };
    }
    
    private handleChange(value: string[], selectedOptions?: CascaderOptionType[]) {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, value);
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        if (!info.name) {
            return <div>name property is required for Cascader Element</div>;
        }

        if (!this.props.$data) {
            return <div>Cascader Element is out of RCRE control, please put it inside container component</div>;
        }
        
        if (!info.options) {
            return <div>options props is required for Cascader Element</div>;
        }

        let $data = this.props.$data;
        let value = $data.get(info.name);
        
        let cascaderOptions = this.mapCascaderOptions(info); 
        
        return React.createElement(Cascader, {
            ...cascaderOptions,
            options: info.options,
            value: value,
            onChange: this.handleChange 
        });
    }
}

componentLoader.addComponent('cascader', AbstractCascader, CascaderPropsInterface);