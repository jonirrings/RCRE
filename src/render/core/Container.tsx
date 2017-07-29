import * as React from 'react';
import componentLoader from '../util/componentLoader';

export class ContainerProps {
    type: string;
}

export function CreateContainer<T extends ContainerProps>(info: ContainerProps) {
    let component = componentLoader.getComponent<T>(info.type);

    if (!component) {
        return null;
    }
    
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
            
            return React.createElement<ContainerProps>(component, info);
        }
    }

    Container.WrappedComponent = wrappedComponentName;
    Container.displayName = displayName;
    
    return React.createElement<ContainerProps>(Container, info);
}