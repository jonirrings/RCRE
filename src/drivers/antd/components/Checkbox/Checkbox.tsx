import * as React from 'react';
import {Checkbox} from 'antd';
import {CheckboxConfig, CheckboxPropsInterface} from '../../../../abstractComponents/Checkbox/Checkbox';
import {CheckboxProps} from 'antd/es/checkbox/Checkbox';

export default class AntCheckbox extends React.Component<CheckboxPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }
    
    private mapOptions(props: CheckboxConfig): CheckboxProps {
        return {
            disabled: props.disabled,
            defaultChecked: props.defaultChecked
        };
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let checked = event.target.checked;

        if (this.props.onChange) {
            this.props.onChange(checked);
        }
    }
    
    render() {
        return (
            <Checkbox
                onChange={this.handleChange}
                checked={!!this.props.value}
                {...this.mapOptions(this.props.info)}
            >
                {this.props.info.text}
            </Checkbox>
        );
    }
}