import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {FormStateItem} from './Form';
import {Map} from 'immutable';
import * as classNames from 'classnames';

export class FormItemConfig extends BasicConfig {
    /**
     * 数据模型Key
     */
    name?: string;

    /**
     * 是否必须
     */
    required?: string;

    /**
     * 自定义验证规则
     */
    pattern?: string;

    /**
     * 使用内置的验证规则
     */
    rules?: string;

    /**
     * 错误信息
     */
    errmsg?: string;
}

export class FormItemPropsInterface extends BasicContainerPropsInterface {
    info: FormItemConfig;

    /**
     * 当前Container的数据模型对象
     */
    $data: Map<string, any>;
}

export type FormItemError = {
    error: boolean;
    errmsg: string;
};

export interface FormItemStateInterface {
    $error: FormItemError;
}

export default class AbstractFormItem extends BasicContainer<FormItemPropsInterface, FormItemStateInterface> {
    constructor() {
        super();

        this.state = {
            $error: {
                error: false,
                errmsg: ''
            }
        };

        this.setDataProxy = this.setDataProxy.bind(this);
        this.validateFormItem = this.validateFormItem.bind(this);
    }

    componentDidMount() {
        if (this.props.injectChildElement) {
            this.props.injectChildElement(this.validateFormItem);
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        if (!this.props.injectChildElement) {
            return <div>FormItem component should be under Form component</div>;
        }

        if (!info.name) {
            return <div>FormItem component should have name property</div>;
        }

        let children = React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
            return React.cloneElement(child, {
                info: info,
                $data: this.props.$data,
                $setData: this.setDataProxy,
                dataCustomer: this.props.dataCustomer,
                eventHandle: this.props.eventHandle,
                model: this.props.model
            });
        });

        if (this.state.$error.error) {
            let wrapperClass = classNames({
                'ant-form-item': true,
                'has-error': this.state.$error.error
            });

            return (
                <div className={wrapperClass}>
                    {children}
                    <div className="ant-form-explain">{this.state.$error.errmsg}</div>
                </div>
            );
        }

        return (
            <div className="ant-form-item">
                {children}
            </div>
        );
    }

    private validateFormItem(val?: any): FormStateItem {
        let info = this.getPropsInfo(this.props.info);
        let $data = this.props.$data;

        let value = val || $data.get(info.name!);

        if (info.required && !value) {
            this.setState({
                $error: {
                    error: true,
                    errmsg: info.errmsg || `${info.name} is required`
                }
            });
            return {
                status: false,
                data: value,
                name: info.name!
            };
        }

        if (info.pattern) {
            let regex = new RegExp(info.pattern);

            if (!regex.test(value)) {
                this.setState({
                    $error: {
                        error: true,
                        errmsg: info.errmsg || `${info.name} is not match pattern`
                    }
                });
                return {
                    status: false,
                    data: value,
                    name: info.name!
                };
            }
        }

        this.setState({
            $error: {
                error: false,
                errmsg: ''
            }
        });
        return {
            status: true,
            data: value,
            name: info.name!
        };
    }

    private setDataProxy(name: string, value: any) {
        this.validateFormItem(value);

        if (this.props.$setData) {
            this.props.$setData(name, value);
        }
    }
}