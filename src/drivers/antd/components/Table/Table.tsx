// import * as React from 'react';
// import {Table} from 'antd';
// import {TableConfig, TableDataSourceItem, TablePropsInterface} from '../../../../components/Table/Table';
// import {TableProps} from 'antd/lib/table/Table';
//
// export default class AntTable extends React.Component<TablePropsInterface, {}> {
//     constructor() {
//         super();
//     }
//
//     private mapOptions(props: TableConfig): TableProps<TableDataSourceItem> {
//         let retObj: TableProps<TableDataSourceItem> = {};
//
//         if (Array.isArray(props.dataSource)) {
//             retObj.dataSource = props.dataSource;
//         }
//
//         if (Array.isArray(props.columns)) {
//             retObj.columns = props.columns;
//         }
//
//         return retObj;
//     }
//    
//     render() {
//         return <Table {...this.mapOptions(this.props.info)} />;
//     }
// }
