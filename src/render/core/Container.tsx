import * as React from 'react';
import componentLoader from '../util/componentLoader';

export class ContainerProps {
    type: string;
}

export function CreateContainer(info: ContainerProps) {
    let component = componentLoader.getComponent<ContainerProps>(info.type);
    
    if (!component) {
        return null;
    }
    
    return React.createElement<ContainerProps>(component, Object.assign(info, {
        key: Date.now()
    }));
}
