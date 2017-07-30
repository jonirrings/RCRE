import * as React from 'react';
import componentLoader from '../../render/util/componentLoader';
import { Map } from 'immutable';
import { IsString, IsDefined, IsArray, IsBoolean } from 'class-validator';
import createElement from '../../render/util/createElement';
import apiRequest from '../../render/services/api';

export class FormPropsInterface {
    @IsString()
    @IsDefined()
    title: string;

    @IsArray()
    @IsDefined()
    controls: FormItemPropsInterface[];
    
    @IsString()
    @IsDefined()
    api: string;
}

class FormItemPropsInterface {
    @IsString()
    @IsDefined()
    type: string;

    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    @IsDefined()
    label: string;

    @IsBoolean()
    required: boolean;
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(type: string, newValue: any) {
        this.setState({
            data: this.state.data.set(type, newValue)
        });
    }

    async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let data = this.state.data.toObject();
        
        await apiRequest(this.props.api, {
            method: 'POST',
            data: data
        });
    }

    render() {

        let controlComponents = this.props.controls.map((info, index) => {
            let instanceInfo = componentLoader.getComponent(info.type);

            if (!instanceInfo) {
                return null;
            }

            let childProps = Object.assign(info, {
                _onChange: this.handleChange,
                _value: this.state.data.get(info.name) || ''
            });

            let child = createElement<FormItemPropsInterface>(
                instanceInfo.component,
                instanceInfo.componentInterface,
                childProps
            );

            return (
                <div className="form-group" key={index}>
                    {child}
                </div>
            );
        });

        // let actionComponent;
        //
        // if (this.props.actions) {
        //     actionComponent = this.props.actions.map((item, index) => {
        //         let instance = componentLoader.getComponent<FormActionItemPropsInterface>(item.type);
        //
        //         if (!instance) {
        //             return null;
        //         }
        //
        //         let childProps = Object.assign(item, {
        //             onAction: this.handleAction
        //         });
        //
        //         return (
        //             <div className="form-group" key={index}>
        //                 {React.createElement<FormActionItemPropsInterface>(instance, childProps)}
        //             </div>
        //         );
        //     });
        // }

        return (
            <div className="gaea-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-heading">
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="form-body">
                        {controlComponents}
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;