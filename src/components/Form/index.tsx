import * as React from 'react';
import componentLoader from '../../render/util/componentLoader';
import { Map } from 'immutable';

export interface FormPropsInterface {
    title: string;
    controls: FormItemPropsInterface[];
    actions?: FormActionItemPropsInterface[];
}

interface FormItemPropsInterface {
    type: string;
    name: string;
    label: string;
    required?: boolean;
}

interface FormActionItemPropsInterface {
    type: string;
    actionType: string;
}

interface FormItemStateInterface {
    data: Map<string, any>;
}

class Form extends React.Component<FormPropsInterface, FormItemStateInterface> {
    constructor() {
        super();

        this.state = {
            data: Map<string, any>()
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(type: string, newValue: any) {
        this.setState({
            data: this.state.data.set(type, newValue)
        });
    }
    
    handleAction() {
        
    }

    render() {
        let controlComponents = this.props.controls.map((info, index) => {
            let instance = componentLoader.getComponent<FormItemPropsInterface>(info.type);

            if (!instance) {
                return null;
            }

            let childProps = Object.assign(info, {
                onChange: this.handleChange,
                value: this.state.data.get(info.name) || ''
            });

            return (
                <div className="form-group" key={index}>
                    {React.createElement<FormItemPropsInterface>(instance, childProps)} 
                </div>
            );
        });
        
        let actionComponent;
        
        if (this.props.actions) {
            actionComponent = this.props.actions.map((item, index) => {
                let instance = componentLoader.getComponent<FormActionItemPropsInterface>(item.type);
                
                if (!instance) {
                    return null;
                }
                
                let childProps = Object.assign(item, {
                    onAction: this.handleAction
                });
                
                return (
                    <div className="form-group" key={index}>
                        {React.createElement<FormActionItemPropsInterface>(instance, childProps)}
                    </div>
                );
            });
        }

        return (
            <div className="gaea-form">
                <div className="form-heading">
                    <h3>{this.props.title}</h3>
                </div>
                <div className="form-body">
                    {controlComponents}
                    {actionComponent}
                </div>
            </div>
        );
    }
}

export default Form;