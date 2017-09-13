import * as React from 'react';
import {TextPropsInterface} from '../../../../abstractComponents/Plain/Text';

export default class AntText extends React.Component<TextPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let info = this.props.info;
        const defaultTextStyle = {
            padding: '0 10px',
            textAlign: 'center',
            lineHeight: '25px'
        };

        switch (info.textType) {
            case 'link':
                return (
                    <a
                        style={Object.assign(defaultTextStyle, this.props.info.style)}
                        href={this.props.info.href}
                    >
                        {this.props.info.text}
                    </a>
                );

            default:
                return (
                    <span
                        style={Object.assign(defaultTextStyle, this.props.info.style)}
                    >
                        {this.props.info.text}
                    </span>
                );
        }
    }
}