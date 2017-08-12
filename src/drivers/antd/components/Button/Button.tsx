import * as React from 'react';
import {Button} from 'antd';
import {ButtonConfig, ButtonPropsInterface} from '../../../../abstractComponents/Button/Button';

class AntButtonProps {
    type: 'primary' | 'dashed' | 'danger' | 'ghost' | undefined;
    htmlType: 'submit' | 'button' | 'reset';
    icon: string;
    shape: 'circle' | 'circle-outline' | undefined;
    size: 'small' | 'large' | undefined;
    loading: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    ghost: boolean;
    children: any;
}

export default class AntButton extends React.Component<ButtonConfig & ButtonPropsInterface, {}> {
    constructor() {
        super();
    }

    mapOptions(props: ButtonConfig & ButtonPropsInterface): AntButtonProps {
        return {
            htmlType: props.info.htmlType,
            type: props.info.buttonType,
            icon: props.info.icon,
            shape: props.info.shape,
            size: props.info.size,
            loading: props.info.loading,
            onClick: this.props.onClick,
            ghost: props.info.ghost,
            children: props.info.label
        };
    }
    
    render() {
        return React.createElement(Button, this.mapOptions(this.props), this.props.children);
    }
}