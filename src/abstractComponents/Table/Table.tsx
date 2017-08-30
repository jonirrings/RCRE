import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsDefined, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {TableRowSelection} from 'antd/lib/table/Table';
import Trigger from '../../render/core/Trigger/Trigger';
import * as React from 'react';

export class TableDataSourceItem {
    rowSelection: TableRowSelection<TableDataSourceItem>[];
}

export class TableColumnsItem {
    title?: string;
    key?: string;
    dataIndex?: string;
}

export class TableConfig extends BasicConfig {
    @IsDefined()
    dataSource: TableDataSourceItem[];

    @IsDefined()
    columns: TableColumnsItem[];
}

export class TablePropsInterface extends BasicContainerPropsInterface {
    @Validate(IsPageInfo, [TableConfig])
    info: TableConfig;
}

export default class AbstractTable extends BasicContainer<TablePropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let children = React.createElement(Trigger, this.props);
        return this.renderChildren(children);
    }
}