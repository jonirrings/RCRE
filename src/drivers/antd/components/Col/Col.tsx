import * as React from 'react';
import {Col} from 'antd';
import {ColConfig, ColPropsInterface} from '../../../../render/core/Layout/Col/Col';

class AntColProps {
    span: number;
    order: number;
    offset: number;
    push: number;
    pull: number;
}

export default class AntGrid extends React.Component<ColPropsInterface, {}> {
    constructor() {
        super();
    }

    private mapOptions(info: ColConfig): AntColProps {
        return {
            span: info.colSpan || 24,
            order: info.colOrder || 0,
            offset: info.colOffset || 0,
            push: info.colPush || 0,
            pull: info.colPull || 0
        };
    }

    render() {
        return React.createElement(Col, this.mapOptions(this.props.info), this.props.children);
    }
} 