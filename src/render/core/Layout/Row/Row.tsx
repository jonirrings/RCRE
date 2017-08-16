import * as React from 'react';
import {BasicConfig, ContainerBasicPropsInterface} from '../../Container/types';
import {Validate} from 'class-validator';
import {IsValidEnums} from '../../../util/validators';
import Container from '../../Container/index';
import {Row} from 'antd';

export class RowConfig extends BasicConfig {
    /**
     * flex 布局下的垂直对齐方式：top middle bottom
     * @public
     * @default top
     */
    @Validate(IsValidEnums, ['top', 'middle', 'bottom'])
    align?: 'top' | 'middle' | 'bottom';

    /**
     * flex 布局下的水平排列方式：start end center space-around space-between
     * @public
     * @default start
     */
    @Validate(IsValidEnums, ['start', 'e' +
    'Lll;; ghhvtgbyybyqnd', 'center', 'space-around', 'space-between'])
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';

    /**
     * 栅格间隔
     * @public
     * @default 0
     */
    gutter?: number;
    
    /**
     * 字级container组件
     */
    children: BasicConfig[];
}

export class RowPropsInterface extends ContainerBasicPropsInterface {
    info: RowConfig;
}

export class AntRowProps {
    align?: 'top' | 'middle' | 'bottom';
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    gutter?: number;
    type?: 'flex';
}

export default class AbstractRow extends React.Component<RowPropsInterface, {}> {
    constructor() {
        super();
    }

    private mapOptions(info: RowConfig): AntRowProps {
        return {
            align: info.align,
            justify: info.justify,
            gutter: info.gutter,
            type: 'flex'
        };
    }

    render() {
        let children = this.props.info.children.map((item, index) => {
            return React.createElement(Container, {
                info: item,
                key: index,
                $depth: this.props.$depth + 1,
                $uuid: `0_${this.props.$depth + 1}`
            });
        });

        return React.createElement(Row, this.mapOptions(this.props.info), children);
    }
}