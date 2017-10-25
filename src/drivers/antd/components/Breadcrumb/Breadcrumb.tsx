// import * as React from 'react';
// import {Breadcrumb} from 'antd';
// import {BreadcrumbPropsInterface} from '../../../../components/Breadcrumb/Breadcrumb';
//
// const Item = Breadcrumb.Item;
//
// export default class AntBreadcrumb extends React.Component<BreadcrumbPropsInterface, {}> {
//     constructor() {
//         super();
//     }
//
//     render() {
//         let items = this.props.info.items.map((item, key) => {
//             return <Item key={key}><a href={item.path}>{item.name}</a></Item>;
//         });
//
//         return (
//             <Breadcrumb>
//                 {items}
//             </Breadcrumb>
//         );
//     }
// }