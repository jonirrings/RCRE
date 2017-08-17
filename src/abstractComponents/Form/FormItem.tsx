import * as React from 'react';
import * as PropTypes from 'prop-types';
import {BasicFormItem, BasicFormItemConfig, BasicFormItemPropsInterface} from './types';
import {IsBoolean, IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import Col, {ColConfig} from '../../render/core/Layout/Col/Col';
import classNames from 'classnames';

// import {DriverController} from "../../drivers/index";

export class FormItemConfig extends BasicFormItemConfig {
    /**
     * 输入框标签
     * @public
     * @default ''
     */
    @IsString()
    label?: string;
    
    /**
     * 是否必填
     * @public
     * @default false
     */
    @IsBoolean()
    required?: boolean;

    /**
     * 正则表达式
     * @public
     * @default null
     */
    pattern?: string;
}

export class FormItemPropsInterface extends BasicFormItemPropsInterface {
    @Validate(IsPageInfo)
    info: FormItemConfig;
}

class AbstractFormItem<T extends FormItemPropsInterface, P> extends BasicFormItem<T, P> {
    static contextTypes = {
        driver: PropTypes.object
    };

    constructor() {
        super();
    }

    private renderLabel(info: FormItemConfig) {
        if (info.label) {
            let labelClass = classNames({
                'ant-form-item-required': info.required
            });
            let labelElement = (
                <div className="ant-form-item-label">
                    <label className={labelClass}>{info.label}</label>
                </div>
            );
            return this.wrapColumn(info, labelElement, {
                colSpan: 8
            });
        }
        
        return '';
    }
    
    private wrapColumn
        (info: FormItemConfig, children: React.ReactNode, options: ColConfig = {}) {
        return React.createElement(Col, {
            info: {
                colSpan: options.colSpan || info.colSpan,
                colOrder: options.colOrder || info.colOrder,
                colOffset: options.colOffset || info.colOffset,
                colPush: options.colPush || info.colPush,
                colPull: options.colPull || info.colPull
            }
        }, children);
    }

    render() {
        return (
            <div>
                {this.renderLabel(this.props.info)}
                {this.wrapColumn(this.props.info, this.props.children)}
            </div>
        );
    }
}

export default AbstractFormItem;