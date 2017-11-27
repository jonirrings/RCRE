import * as React from 'react';
import {CSSProperties} from 'react';
import * as _ from 'lodash';
import componentLoader from '../../../util/componentLoader';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../Container/types';
import {createChild} from '../../../util/createChild';

export type gridPositionItems = 'top-left' | 'top-center' | 'top-right' |
    'middle-left' | 'middle-center' | 'middle-right' |
    'bottom-left' | 'bottom-center' | 'bottom-right';

export class GridItem extends BasicConfig {
    gridCount?: number;
    gridPosition?: gridPositionItems;
    gridLeft?: number;
    gridTop?: number;
    gridWidth?: number | string;
}

type alignCenterItems =
    'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'initial' | 'inherit' | 'unset';

type justifyContentItems =
    'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit'
    | 'unset';

type CssCombo = {
    justifyContent: justifyContentItems;
    alignItems: alignCenterItems
};

function getCssCombo(position?: gridPositionItems): CssCombo {
    switch (position) {
        case 'top-left':
            return {
                justifyContent: 'initial',
                alignItems: 'initial'
            };

        case 'top-center':
            return {
                justifyContent: 'center',
                alignItems: 'initial'
            };

        case 'top-right':
            return {
                justifyContent: 'flex-end',
                alignItems: 'initial'
            };

        default:
        case 'middle-left':
            return {
                justifyContent: 'initial',
                alignItems: 'center'
            };
        case 'middle-center':
            return {
                justifyContent: 'center',
                alignItems: 'center'
            };
        case 'middle-right':
            return {
                justifyContent: 'flex-end',
                alignItems: 'center'
            };
        case 'bottom-left':
            return {
                justifyContent: 'initial',
                alignItems: 'flex-end'
            };
        case 'bottom-center':
            return {
                alignItems: 'flex-end',
                justifyContent: 'center'
            };

        case 'bottom-right':
            return {
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
            };
    }
}

export class RowConfig extends BasicConfig {
    /**
     * 每行最小高度
     */
    minHeight?: string;

    /**
     * 宽度
     */
    width: number | string;

    /**
     * 测试使用, 显示网格
     */
    showBorder?: boolean;

    /**
     * CSS Class
     */
    className?: string;

    /**
     * 内联CSS属性
     */
    style?: CSSProperties;

    children: GridItem[];
}

export class RowPropsInterface extends BasicContainerPropsInterface {
    info: RowConfig;
}

export default class Row extends BasicContainer<RowPropsInterface, {}> {
    constructor() {
        super();
    }

    private getDefaultGridCount(children: GridItem[]) {
        let cookedGridCount = 0;
        let unCookedCount = 0;

        if (children.length === 0) {
            return 6;
        }

        children.forEach(child => {
            if (child.gridCount) {
                cookedGridCount += child.gridCount;
            } else if (!child.gridWidth) {
                unCookedCount++;
            }
        });

        return (12 - cookedGridCount) / unCookedCount;
    }

    render() {
        let info = this.getPropsInfo(this.props.info);
        let children = info.children;

        if (!_.isArray(children)) {
            return <div>children props is required in Row Component</div>;
        }

        const defaultGridCount = this.getDefaultGridCount(children);

        let childElements = children.map((childInfo, index) => {
            childInfo = this.getPropsInfo(childInfo);
            let gridCount = childInfo.gridCount || defaultGridCount;
            let positionStyle = getCssCombo(childInfo.gridPosition);
            const gridStyles = {
                width: childInfo.gridWidth || `${100 / 12 * gridCount}%`,
                display: 'flex',
                border: info.showBorder ? `1px dashed blue` : ''
            };
            const innerGridStyle = {
                marginTop: `${childInfo.gridTop || 0}px`,
                marginLeft: `${childInfo.gridLeft || 0}px`,
                width: childInfo.gridWidth || '100%',
                display: 'flex',
                ...positionStyle
            };

            let child = createChild(childInfo, {
                info: childInfo,
                $data: this.props.$data,
                $setData: this.props.$setData,
                dataCustomer: this.props.dataCustomer,
                model: this.props.model
            });

            let childElement = (
                <div key={`grid_${childInfo.type}_${index}`} style={gridStyles}>
                    <div style={innerGridStyle}>
                        {child}
                    </div>
                </div>
            );

            return this.renderChildren(childInfo, childElement);
        });

        const rowStyles = {
            display: 'flex',
            width: info.width || '100%',
            minHeight: info.minHeight || '30px',
            border: info.showBorder ? '1px dashed #333' : '',
            ...info.style
        };

        let rowElement = (
            <div style={rowStyles} className={info.className} key={'row'}>
                {childElements}
            </div>
        );

        return this.renderChildren(info, rowElement);
    }
}

componentLoader.addComponent('row', Row, RowPropsInterface);