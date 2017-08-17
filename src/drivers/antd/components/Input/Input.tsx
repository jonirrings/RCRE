import * as React from 'react';
import {Input} from 'antd';
import {InputProps} from 'antd/lib/input/Input';
import {InputConfig, InputPropsInterface} from '../../../../abstractComponents/Input/Input';

class AntInput extends React.Component<InputPropsInterface, {}> {
    constructor() {
        super();
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

    render() {
        let info = this.props.info;

        return React.createElement(Input, this.mapProps(info));
    }
}

export default AntInput;