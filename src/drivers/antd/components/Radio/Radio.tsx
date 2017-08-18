import * as React from 'react';
import { Radio } from 'antd';
import {RadioConfig, RadioPropsInterface} from '../../../../abstractComponents/Radio/Radio';
import {RadioProps} from 'antd/lib/radio/radio';

export default class AntRadio extends React.Component<RadioPropsInterface, {}> {
    constructor() {
        super();
    }
    
    private mapOptions(props: RadioConfig): RadioProps {
        return {
            disabled: props.disabled,
            defaultChecked: props.defaultChecked
        };
    }
    
    render() {
        return React.createElement(Radio, this.mapOptions(this.props.info), this.props.info.text);
    }
}