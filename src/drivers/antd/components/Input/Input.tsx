import * as React from 'react';
import {Input} from 'antd';
import {InputProps} from 'antd/lib/input/Input';
import {InputConfig, InputPropsInterface} from '../../../../abstractComponents/Input/Input';

class AntInput extends React.Component<InputPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    private mapProps(props: InputConfig): InputProps {
        return {
            type: props.inputType,
            id: props.id,
            size: props.size,
            disabled: props.disabled,
            addonBefore: props.addonBefore,
            addonAfter: props.addonAfter
        };
    }
    
    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let target = event.currentTarget;
        let value = target.value;

        this.props.onChange(this.props.info.name, value);
    }
    
    render() {
        let info = this.props.info;

        // console.log(this.props);
        
        return React.createElement(Input, Object.assign(this.mapProps(info), {
            onChange: this.handleChange,
            value: this.props.value
        }));
    }
}

export default AntInput;