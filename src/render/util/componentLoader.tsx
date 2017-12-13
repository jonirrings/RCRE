import * as React from 'react';

export type ComponentLoaderMapVal = {
    component: React.ComponentClass<any>,
    componentInterface: Object
};

export class ComponentLoader {
    private cache: Map<string, ComponentLoaderMapVal>;

    constructor() {
        this.cache = new Map();
    }

    getComponent(type: string): ComponentLoaderMapVal {
        if (type.indexOf('.') >= 0) {
            type = type.split('.').slice(-1)[0];
        }
        
        let info = this.cache.get(type);
        
        if (!info) {
            throw new Error('can not find module of type' + type);
        }
        
        return info;
    }

    addComponent(type: string, component: React.ComponentClass<any>, componentInterface: any) {
        if (!component) {
            throw new Error('ComponentLoader: component of type is null type: ' + type);
        }
        
        this.cache.set(type, {
            component,
            componentInterface
        });
    }
}

const loader = new ComponentLoader();

// _.each(config, (info, name) => {
//     let component = info.component;
//     loader.addComponent(name, component, info.componentInterface);
// });

export default loader;