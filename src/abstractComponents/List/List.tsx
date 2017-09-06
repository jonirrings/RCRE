import * as React from 'react';
import * as _ from 'lodash';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsArray, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {isExpression, runInContext} from '../../render/util/vm';
import componentLoader from '../../render/util/componentLoader';
import {Map} from 'immutable';
import createElement from '../../render/util/createElement';

import './List.css';

export class ListItemMappingConfig {
    [s: string]: string;
}

export class ListItem {
}

// TODO ListConfig params validation
export class ListConfig extends BasicConfig {
    resource: string;

    itemMap: ListItemMappingConfig;

    @IsArray()
    iterator: BasicConfig[];
}

export class ListPropsInterface extends BasicContainerPropsInterface {
    @Validate(IsPageInfo, [ListConfig])
    info: ListConfig;
}

export default class AbstractList extends BasicContainer<ListPropsInterface, {}> {
    constructor() {
        super();
    }

    private getResource(info: ListConfig): ListItem[] {
        let resource = info.resource;

        if (isExpression(resource)) {
            return [];
        }

        // resource will automatic parse from parent containers
        if (Array.isArray(resource)) {
            return resource;
        }

        return [];
    }

    render() {
        let info = this.props.info;
        let resource = this.getResource(info);

        if (resource.length === 0) {
            return <div className="rcre-abstract-list">没有数据</div>;
        }

        let children = resource.map((item, index) => {
            return [
                this.renderResource(item),
                <hr key={index}/>,
            ];
        });

        return this.renderChildren(<div className="rcre-abstract-list">{children}</div>);
    }

    private renderResource(item: ListItem) {
        let ret = _.cloneDeep(item);

        if (!_.isEmpty(this.props.info.itemMap)) {
            _.each(this.props.info.itemMap, (expression, key) => {
                ret[key] = runInContext(expression, {
                    $resource: item,
                    $global: this.context.$global
                });
            });
        }

        let iterator = this.parseIterator(this.props.info.iterator, ret);

        return iterator.map((i, index) => this.renderIterator(i, index, 0, ret));
    }

    private parseIterator(iterator: BasicConfig[], item: ListItem) {
        let iteratorCopy = _.cloneDeep(iterator);

        _.each(iteratorCopy, (config, index) => {
            _.each(config, (val, key) => {
                if (isExpression(val)) {
                    // if (_.isEmpty(item)) {
                    //     config[key] = '';
                    // }

                    let output = runInContext(val, {
                        $resource: item
                    });

                    if (output) {
                        config[key] = output;
                    }
                }

                if (val && key === 'children' && Array.isArray(val)) {
                    config[key] = this.parseIterator(val, item);
                }
            });
        });

        return iteratorCopy;
    }

    private renderIterator(iterator: BasicConfig, index: number, depth: number, item: ListItem) {
        let type = iterator.type;
        let componentInfo = componentLoader.getAbstractComponent(type);

        if (!componentInfo) {
            return React.createElement('pre', {}, `can not find component of type ${type}`);
        }

        let {
            component,
            componentInterface
        } = componentInfo;

        return createElement(component, componentInterface, {
            key: `${type}_${index}_${depth}`,
            info: iterator,
            $data: Map(item)
        });
    }
}