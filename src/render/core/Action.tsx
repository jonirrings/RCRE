import * as React from 'react';
import componentLoader from '../util/componentLoader';
import createElement from '../util/createElement';

export class ActionProps {
    type: string;
    [s: string]: any;
}

export function createAction(info: ActionProps) {
    let componentInfo = componentLoader.getComponent(info.type);
    
    if (!componentInfo) {
        console.error(`can not find component of type: ${info.type}`);
        return;
    }
    
    let {
        componentInterface,
        component
    } = componentInfo;

    const wrappedComponentName = component.displayName || component.name || 'ActionComponent';
    const displayName = `Action(${wrappedComponentName})`;
    
    class Action extends React.Component<ActionProps, {}> {
        static WrappedComponent: string;
        static displayName: string;

        constructor() {
            super();
        }
        
        render() {
            if (!component) {
                return null;
            }
            
            return createElement<ActionProps>(component, componentInterface, info);
        }
    }

    Action.WrappedComponent = wrappedComponentName;
    Action.displayName = displayName;

    return React.createElement<ActionProps>(Action, Object.assign(info, {
        key: info.key
    }));
}