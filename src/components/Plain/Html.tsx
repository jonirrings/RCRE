// import * as React from 'react';
// import * as jsonformat from 'json-format';
// import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
//
// export class HtmlConfig extends BasicConfig {
//    
// }
//
// export class HtmlPropsInterface extends BasicContainerPropsInterface {
//     info: HtmlConfig;
// }
//
// export default class AbstractHTML extends BasicContainer<HtmlPropsInterface, {}> {
//     constructor() {
//         super();
//     }
//    
//     render() {
//         console.log(this.props.info.data);
//         return (
//             <code>
//                 {jsonformat(this.props.info.data)}
//             </code>
//         );
//     }
// }