import * as React from 'react';
import {CSSProperties} from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean} from 'class-validator';
import {Table} from 'antd';
import componentLoader from '../../render/util/componentLoader';
import {Map} from 'immutable';
import * as _ from 'lodash';
import {createChild} from '../../render/util/createChild';
import {compileValueExpress} from '../../render/util/vm';
import {TableProps} from 'antd/lib/table';
import {PaginationProps} from 'antd/lib/pagination';

interface DataSource {
    [s: string]: any;
}

export class TableColumnsItem {
    /**
     * 列头显示文字
     */
    title?: string;

    /**
     * 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
     */
    dataIndex?: string;

    /**
     * 列的 className
     */
    className?: string;

    /**
     * 自定义渲染函数, 由组件自生成
     */
    render?: (text: any, record: DataSource, index: number) => React.ReactNode;

    /**
     * 列是否固定，可选 true(等效于 left) 'left' 'right'
     */
    fixed?: boolean | ('left' | 'right');

    /**
     * 列宽度
     */
    width?: string | number;
}

export class TableCustomerColumnControlItem {
    /**
     * 列数据在数据项中对应的Key
     */
    dataIndex: string;

    /**
     * 使用RCRE来进行自定义渲染
     */
    controls?: BasicConfig[];

    /**
     * 自定义渲染最外容器的className
     */
    className: string;

    /**
     * 自定义渲染最外层的内联CSS
     */
    style: CSSProperties;
}

export class TableConfig extends BasicConfig {
    /**
     * 是否显示外边看
     */
    @IsBoolean()
    bordered?: boolean;

    /**
     * 表格列的配置描述，具体项见下表
     */
    columns: TableColumnsItem[];

    /**
     * 数据数组
     */
    dataSource: DataSource[];

    /**
     * 是否是加载中
     */
    loading?: boolean;

    /**
     * 行的CSS class
     */
    rowClassName?: string;

    /**
     * 是否显示表头
     */
    showHeader?: boolean;

    /**
     * 表格标题
     */
    title?: string;

    /**
     * 是否含有分页
     */
    pagination?: false | PaginationProps;

    /**
     * 表格大小
     */
    size?: 'default' | 'middle' | 'small' | undefined;

    /**
     * 额外的展开行
     */
    expandedRowKeys?: string[];

    /**
     * 默认文案设置，目前包括排序、过滤、空数据文案
     */
    locale?: {
        filterConfirm: string,
        filterReset: string,
        emptyText: string,
    };

    /**
     * 展示树形数据时，每层缩进的宽度，以 px 为单位
     */
    indentSize?: number;

    /**
     * 固定表格头部
     */
    useFixedHeader?: boolean;

    /**
     * CSS样式
     */
    style?: CSSProperties;

    /**
     * CSS class
     */
    className?: string;

    /**
     * 列属性映射
     */
    columnsMapping?: TableColumnsItem;

    /**
     * 值属性映射
     */
    dataSourceMapping?: DataSource;

    /**
     * 表格扩展列
     */
    extendColumns?: TableColumnsItem[];

    /**
     * 指定对一些列进行自定义渲染
     */
    customerColumnControls?: TableCustomerColumnControlItem[];

    /**
     * 选取column的字段作为整行的表格行key
     */
    rowKey?: string;
}

export class TablePropsInterface extends BasicContainerPropsInterface {
    info: TableConfig;
}

interface TableStateInterface {
    total: number;
    current: number;
}

export class TableDriver extends Table<DataSource> {
    
}

export class AbstractTable extends BasicContainer<TablePropsInterface, TableStateInterface> {
    constructor() {
        super();

        this.state = {
            total: 0,
            current: 0
        };
    }

    private mapTableOptions(info: TableConfig): TableProps<{}> {
        return {
            pagination: info.pagination,
            size: info.size,
            expandedRowKeys: info.expandedRowKeys || [],
            loading: info.loading,
            locale: info.locale,
            indentSize: info.indentSize,
            useFixedHeader: info.useFixedHeader,
            bordered: info.bordered,
            showHeader: info.showHeader,
            className: info.className,
            style: info.style
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info, this.props, ['columnsMapping', 'dataSourceMapping']);
        let dataSource: DataSource[] = [];
        let columns: TableColumnsItem[] = [];

        if (Array.isArray(info.columns)) {
            columns = info.columns;
        }

        if (Array.isArray(info.dataSource)) {
            dataSource = info.dataSource;
        }

        let $loading = info.loading;

        if (this.props.$data) {
            $loading = this.props.$data.get('$loading') || false;
        }

        if (_.isPlainObject(info.columnsMapping)) {
            columns = columns.map(co => {
                let runTime = this.getRuntimeContext(this.props, this.context);
                let newObj = compileValueExpress(info.columnsMapping, {
                    ...runTime,
                    $item: co
                })!;

                return Object.assign(co, newObj);
            });
        }

        if (_.isPlainObject(info.dataSourceMapping)) {
            dataSource = dataSource.map(source => {
                let runTime = this.getRuntimeContext(this.props, this.context);
                let newObj = compileValueExpress(info.dataSourceMapping, {
                    ...runTime,
                    $item: source
                });

                return Object.assign(source, newObj);
            });
        }

        if (info.extendColumns instanceof Array) {
            columns = columns.concat(info.extendColumns);
            console.log(columns);
        }

        if (info.customerColumnControls instanceof Array && columns.length > 0) {
            info.customerColumnControls.forEach(item => {
                this.renderCustomerColumnItems(columns, item);
            });
        }

        let tableProps = this.mapTableOptions(info);

        const tableStyle = {
            width: '100%',
            ...info.style
        };

        tableProps.loading = $loading;
        
        console.log(Table);

        // return <div>hellowlrld</div>;
        return (
            <TableDriver
                {...tableProps}
                rowKey={record => {
                    if (info.rowKey) {
                        return record[info.rowKey];
                    } else {
                        return `row_key_${Math.random()}`;
                    }
                }}
                columns={columns}
                dataSource={dataSource}
                style={tableStyle}
            />
        );
    }

    private renderCustomerColumnItems(columns: TableColumnsItem[], columnConfig: TableCustomerColumnControlItem) {
        if (!columnConfig.dataIndex) {
            console.error('invalid customerColumnItems');
            return;
        }

        let targetColumn = _.find(columns, co => co.dataIndex === columnConfig.dataIndex);

        if (!targetColumn) {
            console.error('can not find matched column');
            return;
        }

        targetColumn.render = ((text: any, record: DataSource, index: number) => {
            let childElement;
            if (columnConfig.controls) {
                childElement = columnConfig.controls.map(childInfo => {
                    let defaultProps = this.getChildProps(childInfo, {
                        key: `table_column_${index}`
                    });
                    return createChild(childInfo, {
                        ...defaultProps,
                        $item: Map(record),
                        $index: index
                    });
                });
            } else {
                childElement = text;
            }

            return (
                <div className={columnConfig.className} style={columnConfig.style} key={index}>
                    {childElement}
                </div>
            );
        });
        
        Object.assign(targetColumn, columnConfig);
    }
}

componentLoader.addComponent('table', AbstractTable, TablePropsInterface);