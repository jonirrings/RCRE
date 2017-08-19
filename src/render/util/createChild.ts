import * as React from 'react';
import {BasicConfig} from '../core/Container/types';
import componentLoader from '../util/componentLoader';
import createElement from './createElement';

export function createChild(item: BasicConfig, childProps: Object, WrappedContainer: React.ComponentClass<any>) {
    if (!item.data) {
        let InnerComponentInfo = componentLoader.getAbstractComponent(item.type);

        if (!InnerComponentInfo) {
            console.error('can not find component of type ' + item.type);
            return;
        }

        return createElement(InnerComponentInfo.component, InnerComponentInfo.componentInterface, childProps);
    }

    return React.createElement(WrappedContainer, childProps);
}