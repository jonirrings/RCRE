// import * as React from 'react';
// import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../Container/types';
// import * as _ from 'lodash';
// import {createChild} from '../../../util/createChild';
// import componentLoader from '../../../util/componentLoader';
//
//
// export default class Grid extends BasicContainer<GridPropsInterface, {}> {
//     constructor() {
//         super();
//     }
//
//     private getDefaultGridCount(children: GridItem[]) {
//         let cookedGridCount = 0;
//         let unCookedCount = 0;
//
//         if (children.length === 0) {
//             return 6;
//         }
//
//         children.forEach(child => {
//             if (child.gridCount) {
//                 cookedGridCount += child.gridCount;
//             } else {
//                 unCookedCount++;
//             }
//         });
//        
//         return Math.floor((12 - cookedGridCount) / unCookedCount);
//     }
//
//     render() {
//         let info = this.getPropsInfo(this.props.info);
//         let children = info.children;
//         if (!_.isArray(children)) {
//             return <div>children props is required for grid components</div>;
//         }
//
//         const defaultGridCount = this.getDefaultGridCount(children);
//         let childElements = children.map((childInfo, index) => {
//             let gridCount = childInfo.gridCount || defaultGridCount;
//             let positionStyle = getCssCombo(childInfo.gridPosition);
//             const gridStyles = {
//                 width: `${100 / 12 * gridCount}%`,
//                 display: 'flex',
//                 ...positionStyle
//             };
//             let child = createChild(childInfo, {
//                 info: childInfo,
//                 $data: this.props.$data,
//                 onChange: this.props.onChange
//             });
//             return (
//                 <div key={`grid_${childInfo.type}_${index}`} style={gridStyles}>
//                     {child}
//                 </div>
//             );
//         });
//
//         const gridStyle = {
//             width: '100%',
//             display: 'flex'
//         };
//         return (
//             <div style={gridStyle}>
//                 {childElements}
//             </div>
//         );
//     }
// }
//
// componentLoader.addComponent('grid', Grid, GridPropsInterface);