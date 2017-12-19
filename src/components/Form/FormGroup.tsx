import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import componentLoader from '../../render/util/componentLoader';
import {createChild} from '../../render/util/createChild';
import {FormItemConfig} from './FormItem';

class FormGroupConfig extends BasicConfig {
    /**
     * 表单文字
     */
    label?: string;

    /**
     * 表单文字的相对宽度
     */
    labelGrid?: {
        gridCount?: number;
        gridWidth?: number;
        gridLeft?: number;
        gridTop?: number;
    };

    /**
     * 表单文字的扩展样式
     */
    labelStyle?: React.CSSProperties;

    /**
     * 描述文字
     */
    desc?: string;

    /**
     * 表单描述的扩展样式
     */
    descStyle?: React.CSSProperties;
    
    /**
     * 控制的表单元素
     */
    control: FormItemConfig;
}

export type FormGroupStateHandle = (state: boolean, errmsg?: string) => void;

class FormGroupPropsInterface extends BasicContainerPropsInterface {
    info: FormGroupConfig;
}

class FormGroupStateInterface {
    error: {
        $error: boolean;
        $errmsg: string;
    };
}

class FormGroup extends BasicContainer<FormGroupPropsInterface, FormGroupStateInterface> {
    private handleFormState: FormGroupStateHandle;
    
    constructor() {
        super();
        
        this.state = {
            error: {
                $error: false,
                $errmsg: ''
            }
        };
        
        this.handleFormState = (isError: boolean, errmsg: string) => {
            this.setState({
                error: {
                    $error: isError,
                    $errmsg: errmsg
                }
            });
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info, this.props, ['controls']);

        if (!info.control) {
            return this.errorReport('control property is required for FormGroup', 'div');
        }
        
        // set FormItem to true
        info.control.formItem = true;
        
        const buildInConfig = {
            type: 'row',
            children: [
                info.control
            ]
        };

        if (info.label) {
            let labelInfo: BasicConfig = {
                type: 'text',
                text: info.label,
                htmlType: 'label',
                className:  info.control.required ? 'ant-form-item-required' : '',
                gridCount: 2,
                gridPosition: 'middle-right',
                gridHeight: 40
            };
            
            if (_.isPlainObject(info.labelGrid) && info.labelGrid) {
                for (let key in info.labelGrid) {
                    if (info.labelGrid[key]) {
                        labelInfo[key] = info.labelGrid[key];
                    }
                }
            }
            
            if (info.labelStyle) {
                labelInfo.style = info.labelStyle;
            }
            
            buildInConfig.children.unshift(labelInfo);
        }

        buildInConfig.children = buildInConfig.children.filter(item => item.type !== 'null');
        
        const groupClass = classNames({
            'ant-form-item': true,
            'ant-form-item-with-help': this.state.error.$error
        });
        
        let children = (
            <div className={groupClass}>
                {createChild(buildInConfig, {
                    ...this.props,
                    onFormStateChange: this.handleFormState,
                    info: buildInConfig
                })}
            </div>
        );
        
        return this.renderChildren(info, children);
    }
}

componentLoader.addComponent('formGroup', FormGroup, FormGroupPropsInterface);