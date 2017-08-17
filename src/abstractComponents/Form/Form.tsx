import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Map} from 'immutable';
import {FormItem, FormItemBasicConfig, FormItemBasicPropsInterface} from './types';
import {BasicConfig, BasicContainer, ContainerProps} from '../../render/core/Container/types';
import {IsArray, IsDefined, IsString} from 'class-validator';
import {DriverController} from '../../drivers/index';
import createElement from '../../render/util/createElement';

// import {runInContext} from '../../render/util/vm';

export class FormConfig extends BasicConfig {
    @IsString()
    @IsDefined()
    title: string;

    @IsArray()
    controls: FormItemBasicConfig[];

    @IsString()
    @IsDefined()
    submitUrl: string;
}

export class FormPropsInterface extends ContainerProps {
    info: FormConfig;
}

class Form extends BasicContainer<FormPropsInterface, {}> {
    static contextTypes = {
        driver: PropTypes.object
    };

    private childInstance: Map<string, FormItem<FormItemBasicPropsInterface, {}>>;

    constructor() {
        super();

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.childInstance = Map();
    }

    // handleChange(type: string, newValue: any) {
    //     this.props.setData({
    //         type,
    //         newValue
    //     });
    // }
    //
    // async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //    
    //     let isValidate = this.checkFormItem();
    //    
    //     if (!isValidate) {
    //         return;
    //     }
    //    
    //     let data = this.props.$data.toObject();
    //    
    //     await apiRequest(this.props.submitUrl, {
    //         method: 'POST',
    //         data: data
    //     });
    // }
    //
    // checkFormItem() {
    //     let instanceArr = this.childInstance.toArray();
    //    
    //     return instanceArr.every(child => {
    //         return child.isValid();
    //     });
    // }

    private renderControl(info: FormItemBasicConfig): JSX.Element {
        let type = info.type;
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(type);

        if (!componentInfo) {
            console.error(`can not find component of type ${type}`);
            return <div/>;
        }

        let {
            component,
            componentInterface
        } = componentInfo;
        //
        // let updatedValue = this.props.$data.get(info.name);
        // let defaultValue;

        // if (info.initValue) {
        //     defaultValue = runInContext(info.initValue)
        // }
        
        let childElements;
        if (info.controls) {
            childElements = info.controls.map(control => this.renderControl(control));
        }

        return createElement(component, componentInterface, {
            key: info.name,
            info: info
        }, childElements);
    }

    private renderTitle(): JSX.Element {
        let info = this.props.info;

        return (
            <div className="form-title">
                <h3>{info.title}</h3>
            </div>
        );
    }

    render() {
        let controls = this.props.info.controls;
        let controlChildren;

        if (controls && controls.length > 0) {
            controlChildren = controls.map(control => this.renderControl(control));
        }

        return (
            <form>
                {this.renderTitle()}
                {controlChildren}
            </form>
        );
    }
}

export default Form;