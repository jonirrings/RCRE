import * as React from 'react';
import { Button } from 'antd';
import { ButtonPropsInterface } from '../../../../abstractComponents/Button/Button';

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

export default class AntButton extends React.Component<ButtonPropsInterface, {}> {
    constructor() {
        super();
    }

    mapOptions(props: ButtonPropsInterface): AntButtonProps {
        return {
            htmlType: props.htmlType,
            type: props.buttonType,
            icon: props.icon,
            shape: props.shape,
            size: props.size,
            loading: props.loading,
            onClick: props.onClick,
            ghost: props.ghost,
            children: props.label
        };
    }
    
    render() {
        let {
            children
        } = this.mapOptions(this.props);
        
        return React.createElement(Button, this.mapOptions(this.props), children);
    }
}