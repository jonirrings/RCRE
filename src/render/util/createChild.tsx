import * as React from 'react';
import * as _ from 'lodash';
import {BasicConfig, BasicContainerPropsInterface} from '../core/Container/types';
import componentLoader from '../util/componentLoader';
import createElement from './createElement';
import Trigger from '../core/Trigger/Trigger';
import '../../components/index';
import '../core/Layout/Row/Row';

export function createChild<T extends BasicContainerPropsInterface>(item: BasicConfig,
                            childProps: T,
                            childElements: React.ReactNode = null) {
    if (!_.isPlainObject(item)) {
        console.error('invalid Item Object', item);
        return React.createElement('div', {}, 'invalid Item Object');
    }

    let component: React.ComponentClass<any>;
    let componentInterface;

    let componentInfo = componentLoader.getAbstractComponent(item.type);
    
    if (!componentInfo || !componentInfo.component || !componentInfo.componentInterface) {
        return React.createElement('pre', {}, `can not find component of type ${item.type}`);
    }

    component = componentInfo.component;
    componentInterface = componentInfo.componentInterface;
    
    let children = createElement<T>(component, componentInterface, childProps, childElements);
    
    if (item.trigger) {
        return React.createElement(Trigger, {
            info: childProps.info!,
            $data: childProps.$data!,
            $setData: childProps.$setData!,
            model: childProps.model!,
            key: childProps.key!,
            dataCustomer: childProps.dataCustomer!
        }, children);
    }
    
    return children;
}