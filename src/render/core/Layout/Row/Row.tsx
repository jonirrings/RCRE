import * as React from 'react';
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
            } else {
                unCookedCount++;
            }
        });

        return Math.floor((12 - cookedGridCount) / unCookedCount);
    }

    render() {
        let info = this.getPropsInfo(this.props.info);
        let children = info.children;
        
        if (!_.isArray(children)) {
            return <div>children props is required in Row Component</div>;
        }

        const defaultGridCount = this.getDefaultGridCount(children);
        
        let childElements = children.map((childInfo, index) => {
            let gridCount = childInfo.gridCount || defaultGridCount;
            let positionStyle = getCssCombo(childInfo.gridPosition);
            const gridStyles = {
                width: `${100 / 12 * gridCount}%`,
                display: 'flex',
                ...positionStyle
            };
            let child = createChild(childInfo, {
                info: childInfo,
                $data: this.props.$data,
                onChange: this.props.onChange
            });
            return (
                <div key={`grid_${childInfo.type}_${index}`} style={gridStyles}>
                    {child}
                </div>
            );
        });
        
        const rowStyles = {
            display: 'flex',
            minHeight: info.minHeight || '30px'
        };
        
        return (
            <div style={rowStyles}>
                {childElements}
            </div>
        );
    }
}

componentLoader.addComponent('row', Row, RowPropsInterface);