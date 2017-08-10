// import * as React from 'react';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicControlPropsInterface} from './types';
import {Map} from 'immutable';
import {parseObjectPropertyExpress} from '../../util/vm';

interface ControlOptions {
    index: string;
    $data: Map<string, any>;
    $handleChange: (type: string, newValue: any) => void;
}

// class Control extends React.Component<{}, {}> {
//     constructor() {
//         super();
//     }
//    
//     render() {
//         return <div>
//             {this.props.children}
//         </div>;
//     }
// }

export function createControl(info: BasicControlPropsInterface, options: ControlOptions) {
    let componentInfo = componentLoader.getComponent(info.type);

    if (!componentInfo) {
        console.error(`can not find component of type: ${info.type}`);
        return null;
    }

    let {
        componentInterface,
        component
    } = componentInfo;

    // const wrappedComponentName = component.displayName || component.name || 'ControlComponent';
    // const displayName = `Control(${wrappedComponentName})`;
    //
    // type ControlInstance = BasicControl<BasicControlPropsInterface, {}>;
    //
    // class Control extends React.Component<BasicControlPropsInterface, {}> {
    //     static WrappedComponent: string;
    //     static displayName: string;
    //     static defaultValue = {
    //         [info.name]: info.initValue  
    //     };
    //
    //     private childInstance: ControlInstance;
    //     constructor() {
    //         super();
    //     }
    //
    //     handleChange(type: string, newValue: any) {
    //         options.$handleChange(type, newValue);
    //     }
    //
    //     checkFormItem() {
    //         return this.childInstance.isValid();
    //     }
    //    
    //     render() {
    //         if (!component) {
    //             return null;
    //         }
    //        
    //         let defaultValue;
    //         let updatedValue = options.$data.get(info.name);
    //        
    //         if (info.initValue) {
    //             defaultValue = parseObjectPropertyExpress('$data', info.initValue, options.$data.toObject());
    //         }
    //        
    //         let childProps = Object.assign(info, {
    //             onChange: this.handleChange,
    //             value: typeof updatedValue === 'undefined' ? defaultValue : updatedValue,
    //             ref: (ref: ControlInstance) => {
    //                 if (ref) {
    //                     this.childInstance = ref;
    //                 }
    //             }
    //         });
    //
    //         let child = createElement<BasicControlPropsInterface>(
    //             component,
    //             componentInterface,
    //             childProps
    //         );
    //
    //         return (
    //             <div className="form-group" key={info.name}>
    //                 {child}
    //             </div>
    //         );
    //     }
    // }
    //
    // Control.displayName = displayName;
    // Control.WrappedComponent = wrappedComponentName;

    let defaultValue;
    let updatedValue = options.$data.get(info.name);

    if (info.initValue) {
        defaultValue = parseObjectPropertyExpress('$data', info.initValue, options.$data.toObject()) || info.initValue;
    }

    let childProps = Object.assign(info, {
        onChange: options.$handleChange,
        value: typeof updatedValue === 'undefined' ? defaultValue : updatedValue,
        key: options.index
    });
    
    return createElement(component, componentInterface, childProps);
}