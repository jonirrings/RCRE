import * as React from 'react';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import { BasicContainer, ContainerBasicPropsInterface } from './types';

export function CreateContainer(info: ContainerBasicPropsInterface) {
    let componentInfo = componentLoader.getComponent(info.type);
    
    if (!componentInfo) {
        console.error(`can not find component of type: ${info.type}`);
        return null;
    }
    
    let {
        component,
        componentInterface
    } = componentInfo;
    
    const wrappedComponentName = component.displayName || component.name || 'ContainerComponent';
    const displayName = `Container(${wrappedComponentName})`;

    class Container extends BasicContainer<ContainerBasicPropsInterface, {}> {
        static WrappedComponent: string;
        static displayName: string;

        constructor() {
            super();
        }

        render() {
            if (!component) {
                return null;
            }
            
            console.log(info);
            
            return createElement<ContainerBasicPropsInterface>(component, componentInterface, info);
        }
    }

    Container.WrappedComponent = wrappedComponentName;
    Container.displayName = displayName;
    
    return React.createElement<ContainerBasicPropsInterface>(Container, Object.assign(info, {
        key: displayName
    }));
}