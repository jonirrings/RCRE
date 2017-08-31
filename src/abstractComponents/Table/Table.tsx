import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsDefined, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {TableRowSelection} from 'antd/lib/table/Table';
import Trigger from '../../render/core/Trigger/Trigger';
import * as React from 'react';
import * as _ from 'lodash';
import {isExpression, runInContext} from '../../render/util/vm';

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

    columnsMapping?: TableColumnsItem;

    dataSourceMapping?: TableDataSourceItem;
}

export class TablePropsInterface extends BasicContainerPropsInterface {
    @Validate(IsPageInfo, [TableConfig])
    info: TableConfig;
}

export default class AbstractTable extends BasicContainer<TablePropsInterface, {}> {
    constructor() {
        super();
    }

    private applyMapping<T>(data: T, mappingConfig: T): T {
        let copy = data;

        _.each<T>(mappingConfig, (expression: keyof T, key: string) => {
            let ret = runInContext(expression, {
                $iterator: copy
            });
            
            if (!_.isNil(ret)) {
                copy[key] = ret;
            }
        });

        return copy;
    }

    render() {
        let columns = this.props.info.columns;
        let dataSource = this.props.info.dataSource;

        if (this.props.info.columnsMapping && !isExpression(columns)) {
            columns = _.map(columns, (co) => this.applyMapping(co, this.props.info.columnsMapping)!);
        }

        if (this.props.info.dataSourceMapping && !isExpression(dataSource)) {
            dataSource = _.map(dataSource, (da) => this.applyMapping(da, this.props.info.dataSourceMapping)!);
        }
        
        let childProps = Object.assign({}, this.props, {
            columns: columns,
            dataSource: dataSource
        });
        
        console.log(childProps);

        let children = React.createElement(Trigger, childProps);
        return this.renderChildren(children);
    }
}