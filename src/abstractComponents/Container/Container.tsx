import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import './Container.css';
import {createChild} from '../../render/util/createChild';
import Container from '../../render/core/Container/index';

export class ContainerConfig extends BasicConfig {
    style?: React.CSSProperties;
    
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

    render() {
        let children;
        
        if (Array.isArray(this.props.info.children)) {
            children = this.props.info.children.map((child, index) => {
                return this.renderChild(child, 0, index);
            });
        }
        
        let childElement = React.createElement(Container, this.props, children);
        
        return this.renderChildren(childElement);
    }

    private renderChild(info: BasicConfig, depth: number, index: number) {
        return createChild(info, {
            key: `${info.type}_${depth}_${index}`,
            info: info,
            onChange: this.handleChange
        });
    }

    handleChange(type: string, val: any) {
        this.props.onChange(type, val);
    }

    // private parseChildrenExpression(info: BasicConfig[]) {
    //     let infoCopy = _.cloneDeep(info);
    //     let mirror = this.props.$data.toObject();
    //     let self = this;
    //
    //     if (_.isEmpty(mirror)) {
    //         return infoCopy;
    //     }
    //
    //     const validParseConfig = [
    //         'children'
    //     ];
    //    
    //     function parseExpression(reference: Object, val: any, name: string | number) {
    //         if (isExpression(val)) {
    //             let ret = runInContext(val, {
    //                 $parent: mirror,
    //                 $query: self.context.$query,
    //                 $global: self.context.$global
    //             });
    //            
    //             if (!_.isNil(ret)) {
    //                 reference[name] = ret;
    //             }
    //         }
    //
    //         if (val && typeof name === 'string' && validParseConfig.indexOf(name) >= 0) {
    //             reference[name] = self.parseChildrenExpression(val);
    //         }
    //     }
    //    
    //     _.each(infoCopy, (config, index) => {
    //         if (isExpression(config)) {
    //             parseExpression(infoCopy, config, index);
    //             return;
    //         }
    //        
    //         if (_.isPlainObject(config)) {
    //             _.each(config, (val, name) => {
    //                 parseExpression(config, val, name);
    //             });
    //         }
    //     });
    //
    //     return infoCopy;
    // }
}