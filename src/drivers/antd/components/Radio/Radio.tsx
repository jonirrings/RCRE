import * as React from 'react';
import {Radio} from 'antd';
import {RadioConfig, RadioPropsInterface} from '../../../../abstractComponents/Radio/Radio';
import {RadioProps} from 'antd/lib/radio/radio';

export default class AntRadio extends React.Component<RadioPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }
    
    private mapOptions(props: RadioConfig): RadioProps {
        return {
            disabled: props.disabled,
            defaultChecked: props.defaultChecked
        };
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let checked = event.target.checked;
        
        if (this.props.onChange) {
            this.props.onChange(checked);
        }
    }
    
    render() {
        return (
            <Radio
                checked={!!this.props.value}
                onChange={this.handleChange}
                {...this.mapOptions(this.props.info)}
            >
                {this.props.info.text}
            </Radio>
        );
    }
}