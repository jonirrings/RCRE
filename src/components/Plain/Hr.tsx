// import * as React from 'react';
// import {IsDefined, IsJSON, IsString} from 'class-validator';
// import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
//
// export class HrConfig extends BasicConfig {
//     @IsString()
//     @IsDefined()
//     type: string;
//    
//     @IsJSON()
//     style?: React.CSSProperties;
// }
//
// export class HrPropsInterface extends BasicContainerPropsInterface {
//     info: HrConfig;
// }
//
// const defaultTextStyle = {
//     padding: '0 10px',
//     minWidth: 80,
//     textAlign: 'center',
//     lineHeight: '25px'
// };
//
// class Hr extends BasicContainer<HrPropsInterface, {}> {
//     constructor() {
//         super();
//     }
//
//     render() {
//         let children = (
//             <hr style={Object.assign({}, defaultTextStyle, this.props.info.style)} />
//         );
//
//         return this.renderChildren(this.props.info, children);
//     }
// }
//
// export default Hr;