import * as React from 'react';
import {Row} from 'antd';

import {RowConfig, RowPropsInterface} from '../../../../abstractComponents/Row/Row';

class AntRowProps {
    align?: 'top' | 'middle' | 'bottom';
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

export default class AntGrid extends React.Component<RowPropsInterface, {}> {
    constructor() {
        super();
    }

    private mapOptions(info: RowConfig): AntRowProps {
        return {
            align: info.align,
            justify: info.justify
        };
    }

    render() {
        return React.createElement(Row, this.mapOptions(this.props.info), this.props.children);
    }
} 