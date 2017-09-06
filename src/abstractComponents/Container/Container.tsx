import * as React from 'react';
import * as _ from 'lodash';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import * as PropTypes from 'prop-types';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {isExpression, runInContext} from '../../render/util/vm';
import {createChild} from '../../render/util/createChild';

import './Container.css';

export class ContainerConfig extends BasicConfig {
    style?: React.CSSProperties;
    
    children?: BasicConfig[];
}

export class ContainerPropsInterface extends BasicContainerPropsInterface {
    @Validate(IsPageInfo, [ContainerConfig])
    info: ContainerConfig;
}

export default class AbstractContainer extends BasicContainer<ContainerPropsInterface, {}> {
    static childContextTypes = {
        abstractContainer: PropTypes.bool
    };
    
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    getChildContext() {
        return {
            // 抽象Abstract组件, 为子级的所有组件提供一致的数据模型
            abstractContainer: true
        };
    }

    render() {
        let children;
        
        if (Array.isArray(this.props.info.children)) {
            let ret = this.parseChildrenExpression(this.props.info.children);
            children = ret.map((child, index) => {
                if (child.hidden) {
                    return React.createElement('div', {
                        style: {
                            display: 'none'
                        },
                        key: `${child.type}_${0}_${index}`
                    });
                }
                
                return this.renderChild(child, 0, index);
            });
        }
        
        let childElement = React.createElement('div', {
            style: this.props.info.style,
            className: 'rcre-abstract-container'
        }, children);
        
        return this.renderChildren(childElement);
    }

    private renderChild(info: BasicConfig, depth: number, index: number) {
        console.log(info);
        return createChild(info, {
            key: `${info.type}_${depth}_${index}`,
            info: info,
            onChange: this.handleChange,
            $data: this.props.$data,
            $setData: this.props.$setData,
            $setDataList: this.props.$setDataList
        }, this.context.form, false);
    }

    handleChange(type: string, val: any) {
        this.props.onChange(type, val);
    }

    private parseChildrenExpression(info: BasicConfig[]) {
        let infoCopy = _.cloneDeep(info);
        let mirror = this.props.$data.toObject();
        let self = this;

        if (_.isEmpty(mirror)) {
            return infoCopy;
        }
        
        const validParseConfig = [
            'children',
            'data'
        ];

        function parseExpression(reference: Object, val: any, name: string | number) {
            if (isExpression(val)) {
                let ret = runInContext(val, {
                    $data: mirror,
                    $global: self.context.$global
                });
                
                if (!_.isNil(ret)) {
                    reference[name] = ret;
                }
            }

            if (val && typeof name === 'string' && validParseConfig.indexOf(name) >= 0) {
                reference[name] = self.parseChildrenExpression(val);
            }
        }
        
        _.each(infoCopy, (config, index) => {
            if (isExpression(config)) {
                parseExpression(infoCopy, config, index);
                return;
            }
            
            if (_.isPlainObject(config)) {
                _.each(config, (val, name) => {
                    parseExpression(config, val, name);
                });
            }
        });

        return infoCopy;
    }
}