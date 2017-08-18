import * as React from 'react';
import { Checkbox } from 'antd';
import {CheckboxConfig, CheckboxPropsInterface} from '../../../../abstractComponents/Checkbox/Checkbox';
import {CheckboxProps} from 'antd/es/checkbox/Checkbox';

export default class AntCheckbox extends React.Component<CheckboxPropsInterface, {}> {
    constructor() {
        super();
    }
    
    private mapOptions(props: CheckboxConfig): CheckboxProps {
        return {
            disabled: props.disabled,
            defaultChecked: props.defaultChecked
        };
    }
    
    render() {
        return React.createElement(Checkbox, this.mapOptions(this.props.info), this.props.info.text);
    }
}