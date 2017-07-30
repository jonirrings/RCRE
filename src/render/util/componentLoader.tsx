import * as React from 'react';
import Form, { FormPropsInterface } from '../../components/Form/index';
import Button, { ButtonPropsInterface } from '../../components/Form/FormItem/Button/Button';
import Text, { TextFieldPropsInterface } from '../../components/Form/FormItem/TextField/TextField';
import Html, { HtmlPropsInterface } from '../../components/Plain/Html';
import Plain, { PlainPropsInterface } from '../../components/Plain/Text';

export type ComponentLoaderMapVal = {
    component: React.ComponentClass<any>,
    componentInterface: any
};

class ComponentLoader {
    private cache: Map<string, ComponentLoaderMapVal>;
    constructor() {
        this.cache = new Map();
    }
    
    getComponent(type: string): ComponentLoaderMapVal | undefined {
        return this.cache.get(type);
    }
    
    addComponent<T>(type: string, component: React.ComponentClass<T>, componentInterface: any) {
        this.cache.set(type, {
            component,
            componentInterface
        });        
    }
}

const loader = new ComponentLoader();
loader.addComponent('form', Form, FormPropsInterface);
loader.addComponent('button', Button, ButtonPropsInterface);
loader.addComponent('text', Text, TextFieldPropsInterface);
loader.addComponent('number', Text, TextFieldPropsInterface);
loader.addComponent('password', Text, TextFieldPropsInterface);
loader.addComponent('email', Text, TextFieldPropsInterface);
loader.addComponent('submit', Text, TextFieldPropsInterface);
loader.addComponent('html', Html, HtmlPropsInterface);
loader.addComponent('plain', Plain, PlainPropsInterface);

export default loader;