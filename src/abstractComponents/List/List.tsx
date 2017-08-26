import * as React from 'react';
import * as _ from 'lodash';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {isExpression, runInContext} from '../../render/util/vm';
import componentLoader from '../../render/util/componentLoader';
import createElement from '../../render/util/createElement';

export class ListItemMappingConfig {
    [s: string]: string;
}

export class ListItem {
}

export class ListConfig extends BasicConfig {
    resource: string;

    itemMap: ListItemMappingConfig;

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

    render() {
        let info = this.props.info;
        let resource = this.getResource(info);
        let children = resource.map((item) => this.renderResource(item));

        return <div>{children}</div>;
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

    private renderResource(item: ListItem) {
        let ret = _.cloneDeep(item);

        if (!_.isEmpty(this.props.info.itemMap)) {
            _.each(this.props.info.itemMap, (expression, key) => {
                ret[key] = runInContext(expression, {
                    $resource: item
                });
            });
        }
        //
        let iterator = this.parseIterator(this.props.info.iterator, item);

        return iterator.map((i, index) => this.renderIterator(i, index, 0));
    }

    private renderIterator(iterator: BasicConfig, index: number, depth: number) {
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
            info: iterator
        });
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
}