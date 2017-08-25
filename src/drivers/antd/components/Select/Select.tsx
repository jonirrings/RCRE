import * as React from 'react';
import {Select} from 'antd';
import {OptionConfig, SelectConfig, SelectPropsInterface} from '../../../../abstractComponents/Select/Select';
import {OptionProps, SelectProps, SelectValue} from 'antd/lib/select';

const Option = Select.Option;

class AntSelect extends React.Component<SelectPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    private mapOptions(props: SelectConfig): SelectProps {
        return {
            mode: props.mode,
            allowClear: props.allowClear,
            placeholder: props.placeholder,
            size: props.size,
            disabled: props.disabled
        };
    }

    private mapOptionOptions(props: OptionConfig): OptionProps {
        return {
            disabled: props.disabled,
            value: props.value
        };
    }

    private handleChange(value: SelectValue) {
        this.props.onChange(value);
    }

    render() {
        let Options = this.props.info.options.map(op => {
            return React.createElement(Option, Object.assign(this.mapOptionOptions(op), {
                key: op.key
            }), op.key);
        });

        return React.createElement(Select, Object.assign(this.mapOptions(this.props.info), {
            value: this.props.value,
            onChange: this.handleChange
        }), Options);
    }
}

export default AntSelect;