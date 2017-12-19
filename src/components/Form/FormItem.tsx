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

    /**
     * 额外的错误处理函数
     */
    onFormStateChange?: (state: boolean, errmsg?: string) => void;
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
                ...this.props,
                info: info,
                $setData: this.setDataProxy,
                eventHandle: this.props.eventHandle
            });
        });
        
        let wrapperClass = classNames({
            'ant-form-item-with-help': this.state.$error.error, 
            'has-error': this.state.$error.error
        });
        
        const wrapperStyle = {
            width: '100%'
        };
        
        return (
            <div className={wrapperClass} style={wrapperStyle}>
                {children}
                <div className="ant-form-explain">{this.state.$error.errmsg}</div>
            </div>
        );
    }

    private validateFormItem(val?: any): FormStateItem {
        let info = this.getPropsInfo(this.props.info);
        let $data = this.props.$data;

        let value = val || $data.get(info.name!);
        
        if (info.required && !value) {
            const errmsg = info.errmsg || `${info.name} is required`;
            if (this.props.onFormStateChange) {
                this.props.onFormStateChange(true, errmsg);
            }
            this.setState({
                $error: {
                    error: true,
                    errmsg: errmsg
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
                const errmsg = info.errmsg || `${info.name} is not match pattern`;
                if (this.props.onFormStateChange) {
                    this.props.onFormStateChange(true, errmsg);
                }
                this.setState({
                    $error: {
                        error: true,
                        errmsg: errmsg
                    }
                });
                return {
                    status: false,
                    data: value,
                    name: info.name!
                };
            }
        }

        if (this.props.onFormStateChange) {
            this.props.onFormStateChange(false);
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