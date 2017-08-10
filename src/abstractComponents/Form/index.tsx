import * as React from 'react';
import { Map } from 'immutable';
import { IsString, IsDefined, IsArray} from 'class-validator';
import apiRequest from '../../render/services/api';
import { FormItem, FormItemBasicPropsInterface} from './types';
import { BasicContainer, ContainerProps} from '../../render/core/Container/types';
import { createControl } from '../../render/core/Control/index';

export class FormPropsInterface extends ContainerProps {
    @IsString()
    @IsDefined()
    title: string;

    @IsArray()
    @IsDefined()
    controls: FormItemBasicPropsInterface[];
    
    @IsString()
    @IsDefined()
    submitUrl: string;
}

class Form extends BasicContainer<FormPropsInterface , {}> {
    private childInstance: Map<string, FormItem<FormItemBasicPropsInterface, {}>>;
    
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.childInstance = Map();
    }

    handleChange(type: string, newValue: any) {
        console.log(type, newValue);
        this.props.setData({
            type,
            newValue
        });
    }
    
    async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        let isValidate = this.checkFormItem();
        
        if (!isValidate) {
            return;
        }
        
        let data = this.props.$data.toObject();
        
        await apiRequest(this.props.submitUrl, {
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
            return createControl(info, index);
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