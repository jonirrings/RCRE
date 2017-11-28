import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import './Container.css';
import {createChild} from '../../render/util/createChild';
import Container from '../../render/core/Container/index';
import {ProviderSourceConfig} from '../../render/core/DataProvider/Controller';
import componentLoader from '../../render/util/componentLoader';
import {CustomerSourceConfig} from '../../render/core/DataCustomer/Controller';

export class ContainerConfig extends BasicConfig {
    /**
     * 字级组件
     */
    children: BasicConfig[];

    /**
     * 数据模型Key
     */
    model: string;

    /**
     * dataProvider配置
     */
    dataProvider?: ProviderSourceConfig | ProviderSourceConfig[];

    /**
     * dataCustomer配置
     */
    dataCustomer?: CustomerSourceConfig;
}

export class ContainerPropsInterface extends BasicContainerPropsInterface {
    @Validate(IsPageInfo, [ContainerConfig])
    info: ContainerConfig;
}

export default class AbstractContainer extends BasicContainer<ContainerPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let children;
        
        if (Array.isArray(this.props.info.children)) {
            children = this.props.info.children.map((child, index) => {
                return this.renderChild(child, 0, index);
            });
        }
        
        let childElement = React.createElement(Container, this.props, children);
        
        return this.renderChildren(this.props.info, childElement);
    }

    private renderChild(info: BasicConfig, depth: number, index: number) {
        return createChild(info, {
            key: `${info.type}_${depth}_${index}`,
            info: info
        });
    }
}

componentLoader.addComponent('container', AbstractContainer, ContainerPropsInterface);