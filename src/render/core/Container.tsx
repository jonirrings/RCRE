import * as React from 'react';
import getComponent from '../util/componentLoader';

export class ContainerProps {
    type: string;
}

export function Container(info: ContainerProps) {
    let component = getComponent<ContainerProps>(info.type);
    
    if (!component) {
        return null;
    }
    
    return React.createElement<ContainerProps>(component, info);
}
