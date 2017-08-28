import * as React from 'react';
import {BasicFormItemConfig, BasicFormItemPropsInterface} from './types';
import {IsBoolean, IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import Col, {ColConfig, hasColProps} from '../../render/core/Layout/Col/Col';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

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
}

export class BasicFormItem<T extends BasicFormItemPropsInterface, P> extends React.Component<T, P> {
    static defaultProps = {
        value: ''
    };

    static contextTypes = {
        driver: PropTypes.object,
        form: PropTypes.bool,
        abstractContainer: PropTypes.bool,
        $setData: PropTypes.func
    };

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    public getChildValue() {
        let runTimeKey = this.getRuntimeKey();

        if (!runTimeKey) {
            return null;
        }

        return this.props.$data.get(runTimeKey);
    }

    public handleChange(value: any) {
        let runTimeKey = this.getRuntimeKey();

        if (!runTimeKey) {
            return;
        }

        this.props.onChange(runTimeKey, value);
    }

    public renderChildren<Type>(children: React.ReactElement<Type>) {
        if (hasColProps(this.props.info)) {
            children = React.createElement(Col, {
                info: this.props.info
            }, children);
        }

        return children;
    }

    private getRuntimeKey() {
        if (this.context.form && this.props.info.name) {
            // 作为Form组件下的受控组件
            return this.props.info.name;
        } else if (this.context.abstractContainer && this.props.info.childModel) {
            // 作为抽象Container组件下面的受控组件
            return this.props.info.childModel;
        } else if (this.props.info.model) {
            // 自己带有Container组件, 作为一个单独数据模型的组件
            return this.props.info.model;
        } else {
            console.error('You must provide an key to enable formItem to be controlled');
            return '';
        }
    }
}

export interface FormItemStatesInterface {
    error: boolean;
    errmsg: string;
}

class AbstractFormItem<T extends FormItemPropsInterface>
    extends BasicFormItem<T, FormItemStatesInterface> {
    constructor() {
        super();

        this.state = {
            error: false,
            errmsg: ''
        };

        this.validateFormItem = this.validateFormItem.bind(this);
    }

    componentDidMount() {
        if (this.context.form && this.props.info.name) {
            this.props.injectChildElement(this.validateFormItem);
        }
    }

    render() {
        let errorClass = classNames({
            'has-error': this.state.error,
            'ant-form-item': true
        });

        let child = (
            <div className={errorClass}>
                {this.renderLabel(this.props.info, 8)}
                {
                    this.wrapColumn(this.props.info, [
                        this.addChangeProxyToChildren(this.props.children),
                        this.renderExplain(this.props.info)
                    ], {
                        colSpan: 16
                    })
                }
            </div>
        );

        return this.wrapColumn(this.props.info, child);
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

    private validateFormItem(value?: any): boolean {
        if (!value) {
            value = this.props.value;
        }

        if (this.props.info.required && !value) {
            this.setState({
                error: true,
                errmsg: `${this.props.info.label} is required`
            });
            return false;
        }

        if (this.props.info.pattern) {
            let regex = new RegExp(this.props.info.pattern);

            if (!regex.test(value)) {
                this.setState({
                    error: true,
                    errmsg: `${value} is not satisfied for ${this.props.info.pattern}`
                });
                return false;
            }
        }
        
        this.setState({
            error: false,
            errmsg: ''
        });
        return true;
    }
    
    private renderExplain(info: FormItemConfig) {
        if (!this.state.error) {
            return '';
        }

        return (
            <div className="ant-form-explain" key={`${info.type}.errmsg`}>
                {this.state.errmsg || `${info.label || info.name || info.type} is required`}
            </div>
        );
    }

    private addChangeProxyToChildren(children: React.ReactNode) {
        return React.Children.map(children, (child: React.ReactElement<any>, index) => {
            let oldOnChange = this.props.onChange;

            const cloneProps = Object.assign({}, this.props, {
                onChange: (value: any, event?: React.ChangeEvent<HTMLElement>) => {
                    this.validateFormItem(value);

                    oldOnChange(value, event);
                }
            });
            return React.cloneElement(child, cloneProps);
        });
    }
}

export default AbstractFormItem;