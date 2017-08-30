import * as React from 'react';
import * as _ from 'lodash';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import * as PropTypes from 'prop-types';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import createElement from '../../render/util/createElement';
import componentLoader from '../../render/util/componentLoader';
import {isExpression, runInContext} from '../../render/util/vm';

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
                return this.renderChild(child, 0, index);
            });
        }

        return this.renderChildren((
            <div className="rcre-abstract-container" style={this.props.info.style}>
                {children}
            </div>
        ));
    }

    private renderChild(info: BasicConfig, depth: number, index: number) {
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

    private parseChildrenExpression(info: BasicConfig[]) {
        let infoCopy = _.cloneDeep(info);
        let mirror = this.props.$data.toObject();

        if (_.isEmpty(mirror)) {
            return infoCopy;
        }

        _.each(infoCopy, (config, index) => {
            _.each(config, (val, name) => {
                if (isExpression(val)) {
                    config[name] = runInContext(val, {
                        $data: mirror
                    });
                }

                if (val && name === 'children' && Array.isArray(val)) {
                    config[name] = this.parseChildrenExpression(val);
                }
            });
        });

        return infoCopy;
    }
}