import * as React from 'react';
import Form, {FormPropsInterface} from '../../abstractComponents/Form/index';
import Button, {ButtonPropsInterface} from '../../abstractComponents/Button/Button';
import Text, {TextFieldPropsInterface} from '../../abstractComponents/Form/FormItem/TextField/TextField';
import Html, {HtmlPropsInterface} from '../../abstractComponents/Plain/Html';
import Plain, {PlainPropsInterface} from '../../abstractComponents/Plain/Text';
import Select, {SelectPropsInterface} from '../../abstractComponents/Form/FormItem/Select/Select';
import Tree, {TreePropsInterface} from '../../abstractComponents/Tree/Tree';
import TreeNode, {TreeNodePropsInterface} from '../../abstractComponents/Tree/TreeNode';
import LineChart, {LineChartPropsInterface} from '../../abstractComponents/Chart/LineChart';

export type ComponentLoaderMapVal = {
    component: React.ComponentClass<any>,
    componentInterface: Object
};

export class ComponentLoader {
    private cache: Map<string, ComponentLoaderMapVal>;

    constructor() {
        this.cache = new Map();
    }

    getAbstractComponent(type: string): ComponentLoaderMapVal | undefined {
        if (type.indexOf('.') >= 0) {
            type = type.split('.').slice(-1)[0];
        }
        
        return this.cache.get(type);
    }

    getDriverComponent(name: string, theme: string) {
        if (name.indexOf('.') >= 0) {
            theme = name.split('.')[0];
            name = name.split('.')[1];
        }

        return this.cache.get(`${theme}.${name}`);
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
loader.addComponent('lineChart', LineChart, LineChartPropsInterface);

export default loader;