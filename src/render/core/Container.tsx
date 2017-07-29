import * as React from 'react';
import componentLoader from '../util/componentLoader';
import createElement from '../util/createElement';

export class ContainerProps {
    type: string;
    [s: string]: any
}

export function CreateContainer(info: ContainerProps) {
    let componentInfo = componentLoader.getComponent(info.type);
    
    if (!componentInfo) {
        return null;
    }
    
    let {
        component,
        componentInterface
    } = componentInfo;
    
    const wrappedComponentName = component.displayName || component.name || 'ContainerComponent';
    const displayName = `Container(${wrappedComponentName})`;

    class Container extends React.Component<ContainerProps, {}> {
        static WrappedComponent: string;
        static displayName: string;

        constructor() {
            super();
        }

        render() {
            if (!component) {
                return null;
            }
            
            return createElement<ContainerProps>(component, componentInterface, info);
        }
    }

    Container.WrappedComponent = wrappedComponentName;
    Container.displayName = displayName;
    
    return React.createElement<ContainerProps>(Container, Object.assign(info, {
        key: info.key
    }));
}