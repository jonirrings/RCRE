import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import componentLoader from '../../render/util/componentLoader';
import {createChild} from '../../render/util/createChild';
import {Form} from 'antd';

export class FormConfig extends BasicConfig {
    /**
     * 子级组件
     */
    children: BasicConfig[];
}

export class FormPropsInterface extends BasicContainerPropsInterface {
    info: FormConfig;
}

export class FormStateItem {
    /**
     * 表单状态
     */
    status: boolean;

    /**
     * 表单数据
     */
    data: string | number | boolean;

    /**
     * 表单元素的数据模型Key
     */
    name: string;
}

export class AbstractForm extends BasicContainer<FormPropsInterface, {}> {
    private formItemStatus: ((value?: any) => FormStateItem)[];

    constructor() {
        super();

        this.formItemStatus = [];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.injectChildElement = this.injectChildElement.bind(this);
    }

    render() {
        let info = this.getPropsInfo(this.props.info, this.props, ['children']);

        if (!this.props.$data) {
            return <div>form component should be under container component</div>;
        }

        let children = info.children;

        if (!(children instanceof Array)) {
            return <div>children props should be array</div>;
        }

        let childElement = children.map((child, index) => {
            return createChild(child, this.getChildProps(child, {
                key: `form_element_${index}`,
                injectChildElement: this.injectChildElement
            }));
        });

        return (
            <Form onSubmit={this.handleSubmit}>
                {childElement}
            </Form>
        );
    }

    private injectChildElement(validator: () => FormStateItem) {
        this.formItemStatus.push(validator);
    }

    public handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        let isValid = true;
        let data = {};
        this.formItemStatus.forEach(fn => {
            let ret = fn();

            let status = ret.status;
            if (!status) {
                isValid = false;
                delete data[ret.name];
                return;
            } else {
                data[ret.name] = ret.data;
            }
        });

        if (isValid) {
            this.commonEventHandler('onSubmit', data);
        }
    }
}

componentLoader.addComponent('form', AbstractForm, FormPropsInterface);