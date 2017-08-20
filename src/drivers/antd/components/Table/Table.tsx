import * as React from 'react';
import {Table} from 'antd';
import {TablePropsInterface} from '../../../../abstractComponents/Table/Table';

export default class AntTable extends React.Component<TablePropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return <Table dataSource={this.props.info.dataSource} columns={this.props.info.columns}/>;
    }
}