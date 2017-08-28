import * as React from 'react';
import {Button} from 'antd';
import {ButtonConfig, ButtonPropsInterface} from '../../../../abstractComponents/Button/Button';
import {ButtonProps} from 'antd/lib/button/button';

export default class AntButton extends React.Component<ButtonPropsInterface, {}> {
    constructor() {
        super();
    }

    mapOptions(props: ButtonConfig): ButtonProps {
        return {
            htmlType: props.htmlType,
            type: props.buttonType,
            icon: props.icon,
            shape: props.shape,
            size: props.size,
            loading: props.loading,
            onClick: this.props.onClick,
            ghost: props.ghost,
            disabled: props.disabled
        };
    }
    
    render() {
        return React.createElement(Button, this.mapOptions(this.props.info), this.props.info.text);
    }
}