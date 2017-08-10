import * as React from 'react';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import { BasicControlPropsInterface, BasicControl } from './types';

export function createControl(info: BasicControlPropsInterface, index?: number) {
    let componentInfo = componentLoader.getComponent(info.type);
    
    if (!componentInfo) {
        console.error(`can not find component of type: ${info.type}`);
        return null;
    }
    
    let {
        componentInterface,
        component
    } = componentInfo;

    const wrappedComponentName = component.displayName || component.name || 'ControlComponent';
    const displayName = `Control(${wrappedComponentName})`;
    
    type ControlInstance = BasicControl<BasicControlPropsInterface, {}>;
    
    class Control extends React.Component<BasicControlPropsInterface, {}> {
        static WrappedComponent: string;
        static displayName: string;
        static defaultValue = {
            [info.name]: info.initValue  
        };

        private childInstance: ControlInstance;
        constructor() {
            super();
        }

        handleChange(type: string, newValue: any) {
            console.log('handle change', type, newValue);
            // this.props.setData({
            //     type,
            //     newValue
            // });
        }

        checkFormItem() {
            return this.childInstance.isValid();
        }
        
        render() {
            if (!component) {
                return null;
            }
            
            let childProps = Object.assign(info, {
                onChange: this.handleChange,
                value: info.initValue,
                ref: (ref: ControlInstance) => {
                    if (ref) {
                        this.childInstance = ref;
                    }
                }
            });

            let child = createElement<BasicControlPropsInterface>(
                component,
                componentInterface,
                childProps
            );

            return (
                <div className="form-group" key={info.name}>
                    {child}
                </div>
            );
        }
    }
    
    Control.displayName = displayName;
    Control.WrappedComponent = wrappedComponentName;

    return React.createElement<BasicControlPropsInterface>(Control, Object.assign(info, {
        key: index
    }));
}