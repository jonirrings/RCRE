import * as React from 'react';
import * as _ from 'lodash';
import {BasicConfig, BasicContainerPropsInterface} from '../core/Container/types';
import Container from '../core/Container/index';
import componentLoader from '../util/componentLoader';
import createElement from './createElement';

export function createChild(item: BasicConfig, childProps: Object, inForm: boolean = false) {
    if (!_.isPlainObject(item)) {
        console.error('invalid Item Object', item);
        return React.createElement('div');
    }

    let component: React.ComponentClass<any>;
    let componentInterface;

    if (item.data && !inForm) {
        component = Container;
        componentInterface = BasicContainerPropsInterface;
    } else {
        let componentInfo = componentLoader.getAbstractComponent(item.type);

        if (!componentInfo) {
            console.error(`can not find component of type ${item.type}`);
            return React.createElement('div');
        }

        component = componentInfo.component;
        componentInterface = componentInfo.componentInterface;
    }

    return createElement(component, componentInterface, childProps);
}