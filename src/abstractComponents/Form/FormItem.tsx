import * as React from 'react';
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
    @IsString()
    pattern?: string;

    /**
     * 错误提示信息
     * @public
     * @default ''
     */
    @IsString()
    errmsg?: string;
}

export class FormItemPropsInterface extends BasicFormItemPropsInterface {
    @Validate(IsPageInfo, [FormItemConfig])
    info: FormItemConfig;

    /**
     * 是否有错误
     */
    @IsBoolean()
    isError: boolean;
}

class AbstractFormItem<T extends FormItemPropsInterface, P> extends BasicFormItem<T, P> {
    constructor() {
        super();
    }

    private renderLabel(info: FormItemConfig, colSpan: number) {
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
                colSpan: colSpan
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

    private renderExplain(info: FormItemConfig) {
        if (!this.props.isError) {
            return '';
        }

        return (
            <div className="ant-form-explain" key={`${info.type}.errmsg`}>
                {info.errmsg || `${info.type} is required`}
            </div>
        );
    }

    render() {
        let errorClass = classNames({
            'has-error': this.props.isError,
            'ant-form-item': true
        });

        let child = (
            <div className={errorClass}>
                {this.renderLabel(this.props.info, 8)}
                {
                    this.wrapColumn(this.props.info, [
                        this.props.children,
                        this.renderExplain(this.props.info)
                    ], {
                        colSpan: 16
                    })
                }
            </div>
        );

        return this.wrapColumn(this.props.info, child);
    }
}

export default AbstractFormItem;