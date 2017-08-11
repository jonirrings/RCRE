import * as React from 'react';
import Form, { FormPropsInterface } from '../../abstractComponents/Form/index';
import Button, { ButtonPropsInterface } from '../../abstractComponents/Button/Button';
import Text, { TextFieldPropsInterface } from '../../abstractComponents/Form/FormItem/TextField/TextField';
import Html, { HtmlPropsInterface } from '../../abstractComponents/Plain/Html';
import Plain, { PlainPropsInterface } from '../../abstractComponents/Plain/Text';
import Select, { SelectPropsInterface } from '../../abstractComponents/Form/FormItem/Select/Select';
import Tree, { TreePropsInterface } from '../../abstractComponents/Tree/Tree';
import TreeNode, { TreeNodePropsInterface } from '../../abstractComponents/Tree/TreeNode';

export type ComponentLoaderMapVal = {
    component: React.ComponentClass<any>,
    componentInterface: Object
};

export class ComponentLoader {
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
loader.addComponent('select', Select, SelectPropsInterface);
loader.addComponent('tree', Tree, TreePropsInterface);
loader.addComponent('treeNode', TreeNode, TreeNodePropsInterface);

export default loader;