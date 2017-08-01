import * as React from 'react';
import componentLoader from '../../render/util/componentLoader';
import { Map } from 'immutable';
import { IsString, IsDefined, IsArray} from 'class-validator';
import createElement from '../../render/util/createElement';
import apiRequest from '../../render/services/api';
import { FormItem, FormItemBasicPropsInterface} from './types';

export class FormPropsInterface {
    @IsString()
    @IsDefined()
    title: string;

    @IsArray()
    @IsDefined()
    controls: FormItemBasicPropsInterface[];
    
    @IsString()
    @IsDefined()
    api: string;
}

interface FormItemStateInterface {
    data: Map<string, any>;
}

class Form extends React.Component<FormPropsInterface, FormItemStateInterface> {
    private childInstance: Map<string, FormItem<FormItemBasicPropsInterface, {}>>;
    
    constructor() {
        super();

        this.state = {
            data: Map<string, any>()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.childInstance = Map();
    }

    handleChange(type: string, newValue: any) {
        this.setState({
            data: this.state.data.set(type, newValue)
        });
    }
    
    async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        let isValidate = this.checkFormItem();
        
        if (!isValidate) {
            return;
        }
        
        let data = this.state.data.toObject();
        
        await apiRequest(this.props.api, {
            method: 'POST',
            data: data
        });
    }
    
    checkFormItem() {
        let instanceArr = this.childInstance.toArray();
        
        return instanceArr.every(child => {
            return child.isValid();
        });
    }

    render() {
        let controlComponents = this.props.controls.map((info, index) => {
            let instanceInfo = componentLoader.getComponent(info.type);

            if (!instanceInfo) {
                return null;
            }

            let childProps = Object.assign(info, {
                onChange: this.handleChange,
                value: this.state.data.get(info.name) || info.value,
                ref: (ref: any) => {
                    if (ref) {
                        this.childInstance = this.childInstance.set(info.name, ref);   
                    }
                }
            });
            
            let child = createElement<FormItemBasicPropsInterface>(
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

        return (
            <div className="gaea-form">
                <form className="form" onSubmit={this.handleSubmit}>
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