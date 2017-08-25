import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import createElement from '../../render/util/createElement';
import componentLoader from '../../render/util/componentLoader';

export class ContainerConfig extends BasicConfig {
    children?: BasicConfig[];   
}

export class ContainerPropsInterface extends BasicContainerPropsInterface {
    @Validate(IsPageInfo, [ContainerConfig])
    info: ContainerConfig;
}

export default class AbstractContainer extends BasicContainer<ContainerPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    private renderChildren(info: BasicConfig, depth: number, index: number) {
        let type = info.type;
        let componentInfo = componentLoader.getAbstractComponent(type);

        if (!componentInfo) {
            return <pre>{`can not find component of type: ${type}`}</pre>;
        }

        let {
            component,
            componentInterface
        } = componentInfo;

        return createElement(component, componentInterface, {
            key: `${info.type}_${depth}_${index}`,
            info: info,
            onChange: this.handleChange,
            $data: this.props.$data,
            $setData: this.props.$setData,
            $setDataList: this.props.$setDataList
        });
    }

    handleChange(type: string, val: any) {
        this.props.onChange(type, val);
    }

    render() {
        let children;

        if (Array.isArray(this.props.info.children)) {
            children = this.props.info.children.map((child, index) => {
                return this.renderChildren(child, 0, index);
            });
        }
        
        return (
            <div>
                {children}
            </div>
        );
    }
}