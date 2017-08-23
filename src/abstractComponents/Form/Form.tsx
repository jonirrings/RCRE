import * as React from 'react';
import componentLoader from '../../render/util/componentLoader';
import createElement from '../../render/util/createElement';
import {Map} from 'immutable';
import * as PropsTypes from 'prop-types';
import * as PropTypes from 'prop-types';
import {BasicFormItemConfig} from './types';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsArray, IsDefined, IsString} from 'class-validator';
import * as _ from 'lodash';
import Col from '../../render/core/Layout/Col/Col';
import {DriverController} from '../../drivers/index';

export class FormConfig extends BasicConfig {
    @IsString()
    @IsDefined()
    title: string;

    @IsArray()
    controls: BasicFormItemConfig[];

    @IsString()
    @IsDefined()
    submitUrl: string;
}

export class FormPropsInterface extends BasicContainerPropsInterface {
    info: FormConfig;
}

class AbstractForm extends BasicContainer<FormPropsInterface, {}> {
    static contextTypes = {
        driver: PropTypes.object,
        form: PropTypes.bool
    };

    static childContextTypes = {
        form: PropsTypes.bool
    };

    private childInstance: Map<string, any>;

    constructor() {
        super();

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.childInstance = Map();
    }

    getChildContext() {
        return {
            // 指代, form组件内的组件, 只要这个参数存在, 内部组件就不能存在container组件
            // 整个form的数据要高度统一
            form: true 
        };
    }

    componentWillUnmount() {
        console.log('unmount form');
    }

    private renderControl(info: BasicFormItemConfig, depth: number, index: number): JSX.Element {
        let type = info.type;
        let componentInfo = componentLoader.getAbstractComponent(type);

        if (!componentInfo) {
            console.error(`can not find component of type ${type}`);
            return <div key={Math.random()}/>;
        }

        let {
            component,
            componentInterface
        } = componentInfo;
        
        // TODO There are some HTML elements which is impossible to have childNodes, like input
        // At this point, are warning should to printing if user try to generate a children of an input element
        let childElements;
        if (info.controls && Array.isArray(info.controls)) {
            childElements = info.controls.map((control, i) => {
                this.renderControl(control, depth++, i);
            });
        } else if (info.controls && _.isPlainObject(info.controls)) {
            childElements = this.renderControl(info.controls, depth++, 0);
        }
        
        let children = createElement(component, componentInterface, {
            // TODO collection enough info to generate unique key, to prevent updating from React diff algorithm
            key: `${info.type}_${depth}_${index}`,
            info: info,
            onChange: this.props.onChange,
            $data: this.props.$data,
            $global: this.props.$global,
            $setData: this.props.$setData,
            $setDataList: this.props.$setDataList
        }, childElements);
        
        if (typeof info.colSpan !== 'undefined') {
            return React.createElement(Col, {
                info: this.props.info
            }, children);
        }
        
        return children;
    }

    private renderTitle(): JSX.Element {
        let info = this.props.info;

        if (!info.title) {
            return <div />;
        }

        return (
            <div className="form-title" key="title">
                <h3>{info.title}</h3>
            </div>
        );
    }

    render() {
        let driver: DriverController = this.context.driver;
        let controls = this.props.info.controls;
        let controlChildren;
        
        if (controls && controls.length > 0) {
            controlChildren = controls.map((control, index) => this.renderControl(control, 0, index));
        }
        
        let FormInfo = driver.getComponent(this.props.info.type);
        
        if (!FormInfo) {
            console.error(`Can not find module of ${this.props.info.type}`);
            return <div />;
        }
        
        let form = FormInfo.component;
        let formInterface = FormInfo.componentInterface;
        
        return createElement(form, formInterface, this.props, [
            this.renderTitle(),
            controlChildren
        ]);
    }
}

export default AbstractForm;

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