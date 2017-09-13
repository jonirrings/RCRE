import * as React from 'react';
import componentLoader from '../../render/util/componentLoader';
import createElement from '../../render/util/createElement';
import {Map} from 'immutable';
import * as PropsTypes from 'prop-types';
import {BasicFormItemConfig} from './types';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsArray, IsDefined, IsString, IsUrl, Validate} from 'class-validator';
import * as _ from 'lodash';
import {IsPageInfo} from '../../render/util/validators';
import Trigger from '../../render/core/Trigger/Trigger';
import {request} from '../../render/services/api';
import {compileValueExpress} from '../../render/util/vm';
import {notification} from 'antd';

class SubmitConfig {
    @IsUrl()
    url: string;

    data: Object;

    @IsString()
    method: string;
}

export class FormConfig extends BasicConfig {
    @IsString()
    @IsDefined()
    title: string;

    @IsArray()
    controls: BasicFormItemConfig[];

    @Validate(IsPageInfo, [SubmitConfig])
    submit: SubmitConfig;
}

export class FormPropsInterface extends BasicContainerPropsInterface {
    info: FormConfig;

    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export class FormStatesInterface {
    submit: boolean;
}

class AbstractForm extends BasicContainer<FormPropsInterface, FormStatesInterface> {
    static childContextTypes = {
        form: PropsTypes.bool
    };

    private childInstance: Map<string, any>;
    private formItemStatus: ((value?: any) => boolean)[];

    constructor() {
        super();

        this.state = {
            submit: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.injectChildElement = this.injectChildElement.bind(this);
        this.childInstance = Map();
        this.formItemStatus = [];
    }

    getChildContext() {
        return {
            // 指代, form组件内的组件, 只要这个参数存在, 内部组件就不能存在container组件
            // 整个form的数据要高度统一
            form: true 
        };
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        let submitConfig = this.props.info.submit;

        if (!_.isPlainObject(submitConfig)) {
            return;
        }

        let status = true;
        this.formItemStatus.forEach(fn => {
            let ret = fn();

            if (!ret) {
                status = ret;
            }
        });

        if (!status) {
            console.log('form validate failed');
            return;
        }

        console.log('form validation success');

        let url = submitConfig.url;
        let data = submitConfig.data;
        let method = submitConfig.method;
        
        data = compileValueExpress(data, {
            $data: this.props.$data.toObject(),
            $global: this.context.$global
        });
        
        return request(url, {
            url: url,
            method: method,
            data: data
        }, this.context.$global.proxyServer).then(ret => {
            notification.info({
                message: '操作成功',
                description: ''
            });

            // TODO 暂时先这么搞
            setTimeout(() => {
                location.reload();
            }, 1000);
        });
    }

    componentWillUnmount() {
        console.log('unmount form');
    }

    render() {
        let controls = this.props.info.controls;
        let controlChildren;

        if (controls && controls.length > 0) {
            controlChildren = controls.map((control, index) => this.renderControl(control, 0, index));
        }

        let props = Object.assign({}, this.props, {
            onSubmit: this.handleSubmit
        });

        let children = React.createElement(Trigger, props, [
            this.renderTitle(),
            controlChildren
        ]);

        return this.renderChildren(children);
    }

    private renderControl(info: BasicFormItemConfig, depth: number, index: number): JSX.Element {
        let type = info.type;
        let componentInfo = componentLoader.getAbstractComponent(type);

        if (!componentInfo) {
            console.error(`can not find component of type ${type}`);
            return <div key={Math.random()}/>;
        }

        let {
            component,
            componentInterface
        } = componentInfo;
        
        // TODO There are some HTML elements which is impossible to have childNodes, like input
        // At this point, are warning should to printing if user try to generate a children of an input element
        let childElements;
        if (info.controls && Array.isArray(info.controls)) {
            childElements = info.controls.map((control, i) => {
                this.renderControl(control, depth++, i);
            });
        } else if (info.controls && _.isPlainObject(info.controls)) {
            childElements = this.renderControl(info.controls, depth++, 0);
        }
        
        let compiled = compileValueExpress(info, {
            $data: this.props.$data.toObject(),
            $global: this.context.$global
        });
        
        let children = createElement(component, componentInterface, {
            // TODO collection enough info to generate unique key, to prevent updating from React diff algorithm
            key: `${info.type}_${depth}_${index}`,
            info: compiled,
            onChange: this.props.onChange,
            injectChildElement: this.injectChildElement,
            $data: this.props.$data,
            $setData: this.props.$setData,
            $setDataList: this.props.$setDataList
        }, childElements);

        // if (typeof info.colSpan !== 'undefined') {
        //     return React.createElement(Col, {
        //         info: this.props.info
        //     }, children);
        // }
        
        return children;
    }

    private renderTitle(): JSX.Element {
        let info = this.props.info;

        if (!info.title) {
            return <div key="title"/>;
        }

        return (
            <div className="form-title" key="title">
                <h3>{info.title}</h3>
            </div>
        );
    }

    private injectChildElement(validator: () => boolean) {
        this.formItemStatus.push(validator);
    }
}

export default AbstractForm;