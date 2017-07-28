import * as React from 'react';
import Form from '../../components/Form/index';
import Button from '../../components/Form/FormItem/Button';
import Text from '../../components/Form/FormItem/TextField';

type componentType = React.ComponentClass<any>;

class ComponentLoader {
    private cache: Map<string, componentType>;
    constructor() {
        this.cache = new Map();
    }
    
    getComponent<T>(type: string): React.ComponentClass<T> | undefined {
        return this.cache.get(type);
    }
    
    addComponent<T>(type: string, component: React.ComponentClass<T>) {
        this.cache.set(type, component);        
    }
}

const loader = new ComponentLoader();
loader.addComponent('form', Form);
loader.addComponent('button', Button);
loader.addComponent('text', Text);
loader.addComponent('number', Text);
loader.addComponent('password', Text);
loader.addComponent('email', Text);

export default loader;