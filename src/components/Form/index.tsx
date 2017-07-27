import * as React from 'react';
import getComponent from '../../render/util/componentLoader'

export interface FormPropsInterface {
    title: string;
    controls: FormItemPropsInterface[];
}

interface FormItemPropsInterface {
    type: string;
    name: string;
    label: string;
    required?: boolean;
}

class Form extends React.Component<FormPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let controlComponents = this.props.controls.map(info => {
            let instance = getComponent<any>(info.type);
            
            if (!instance) {
                return null;
            }
            
            let childProps = Object.assign(info, {
                key: info.type
            });
            
            return React.createElement<FormItemPropsInterface>(instance, childProps);
        });

        return (
            <div className="gaea-form">
                <div className="form-heading">
                    <h3>{this.props.title}</h3>
                </div>
                <div className="form-body">
                    {controlComponents}
                </div>
            </div>
        );
    }
}

export default Form;