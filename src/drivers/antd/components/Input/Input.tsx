import * as React from 'react';
import {Input} from 'antd';
import {InputProps} from 'antd/lib/input/Input';
import {InputPropsInterface} from '../../../../abstractComponents/Form/FormItem/Input/Input';

class AntInput extends React.Component<InputPropsInterface, {}> {
    constructor() {
        super();
    }

    private mapProps(props: InputProps): InputProps {
        return {};
    }

    render() {
        let info = this.props.info;

        console.log(info);

        return React.createElement(Input, this.mapProps(info));
    }
}

export default AntInput;