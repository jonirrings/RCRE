import * as React from 'react';
import {IsNumber, Max, Min} from 'class-validator';
import {Col} from 'antd';
import createElement from '../../../util/createElement';

export class ColConfig {
    /**
     * 栅格占位格数，为 0 时相当于 display: none
     * @public
     */
    @IsNumber()
    @Min(0)
    @Max(24)
    colSpan?: number;

    /**
     * 栅格顺序，flex 布局模式下有效
     * @public
     * @default 0
     */
    @IsNumber()
    colOrder?: number;

    /**
     * 栅格左侧的间隔格数，间隔内不可以有栅格
     * @public
     * @default 0
     */
    @IsNumber()
    colOffset?: number;

    /**
     * 栅格向右移动格数
     * @public
     * @default 0
     */
    @IsNumber()
    colPush?: number;

    /**
     * 栅格向左移动格数
     * @public
     * @default 0
     */
    @IsNumber()
    colPull?: number;
}

class AntColProps {
    span: number;
    order: number;
    offset: number;
    push: number;
    pull: number;
}

export class ColPropsInterface {
    info: ColConfig;
}

export default class AbstractCol<T extends ColPropsInterface, P> extends React.Component<T, P> {
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
        return createElement(Col, ColPropsInterface, this.mapOptions(this.props.info), this.props.children);
    }
}