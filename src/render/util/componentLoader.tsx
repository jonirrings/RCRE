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

    getComponent(type: string): ComponentLoaderMapVal | undefined {
        if (type.indexOf('.') >= 0) {
            type = type.split('.').slice(-1)[0];
        }
        
        return this.cache.get(type);
    }

    addComponent(type: string, component: React.ComponentClass<any>, componentInterface: any) {
        if (!componentInterface || !component) {
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