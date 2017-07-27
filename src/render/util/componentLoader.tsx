import Form from '../../components/Form/index';
import Button from '../../components/Button/index';
import * as React from 'react';

let componentMap = new Map<string, React.ComponentClass<any>>();

componentMap.set('form', Form);
componentMap.set('button', Button);

export default function getComponent<T>(type: string): React.ComponentClass<T> | null {
    let component = componentMap.get(type);
    
    if (!component) {
        console.warn('could not find component of type');
        return null;
    }
    
    return component;
}