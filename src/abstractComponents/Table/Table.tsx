import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsDefined, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {TableRowSelection} from 'antd/lib/table/Table';
import Trigger from '../../render/core/Trigger/Trigger';
import * as React from 'react';
import * as _ from 'lodash';
import {compileValueExpress, runInContext} from '../../render/util/vm';
import {FormItemConfig} from '../Form/FormItem';
import {createChild} from '../../render/util/createChild';
import componentLoader from '../../render/util/componentLoader';
import {Map} from 'immutable';

export class TableDataSourceItem {
    rowSelection: TableRowSelection<TableDataSourceItem>[];
}

export class TableColumnsItem {
    title?: string;
    key?: string;
    dataIndex?: string;

    controls?: FormItemConfig[];

    render?: (source: TableDataSourceItem) => any;
}

export class TableConfig extends BasicConfig {
    @IsDefined()
    dataSource: TableDataSourceItem[];

    @IsDefined()
    columns: TableColumnsItem[];

    columnControls?: FormItemConfig[];

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

    render() {
        let info = this.getPropsInfo<TableConfig>(this.props.info);

        if (!info.columns) {
            info.columns = [];
        }

        if (!info.dataSource) {
            info.dataSource = [];
        }

        let columns = info.columns;
        let dataSource = info.dataSource;

        if (info.columnsMapping) {
            columns = _.map(columns, (co, index) => this.applyMapping(co, info.columnsMapping, index)!);
        }

        if (info.dataSourceMapping) {
            dataSource = _.map(dataSource, (da, index) =>
                this.applyMapping(da, info.dataSourceMapping, index)!);
        }
        
        if (info.columnControls && _.isArray(info.columnControls)) {
            columns = columns.concat(info.columnControls);
        }

        columns = columns.map(co => this.renderColumnControls(co));

        let childProps = Object.assign({}, this.props, {
            info: Object.assign(info, {
                columns: columns,
                dataSource: dataSource
            })
        });

        let children = React.createElement(Trigger, childProps);
        return this.renderChildren(children);
    }

    private applyMapping<T>(data: T, mappingConfig: T, index: number): T {
        let copy = data;

        _.each<T>(mappingConfig, (expression: keyof T, key: string) => {
            let ret;
            try {
                ret = runInContext(expression, {
                    $iterator: copy,
                    $index: index
                });
            } catch (e) {
                ret = null;
            }

            if (!_.isNil(ret)) {
                copy[key] = ret;
            }
        });

        return copy;
    }

    private renderControl(info: FormItemConfig, depth: number, index: number, source: TableDataSourceItem) {
        let compiled = compileValueExpress(info, {
            $dataSource: source,
            $index: index
        });

        let childProps = {
            key: `${info.type}_${depth}_${index}`,
            info: compiled,
            onChange: this.props.onChange,
            $data: Map(source)
        };

        return createChild(info, childProps);
    }

    private renderColumnControls(item: TableColumnsItem) {
        let copy = _.cloneDeep(item);

        if (copy.controls) {
            let controls = copy.controls;
            copy.render = (source) => {
                let ret = controls.map((info, index) => this.renderControl(info, 0, index, source));
                console.log(ret);
                return ret;
            };

            delete copy.controls;
        }

        return copy;
    }
}

componentLoader.addComponent('table', AbstractTable, TablePropsInterface);