import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean} from 'class-validator';
import {TableProps} from 'antd/lib/table/Table';
import {CSSProperties} from 'react';
import {Table} from 'antd';
import componentLoader from '../../render/util/componentLoader';
import {Map} from 'immutable';
import {createChild} from '../../render/util/createChild';

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
     * 使用RCRE来进行自定义渲染
     */
    controls?: BasicConfig[];

    /**
     * 自定义渲染函数, 由组件自生成
     */
    render?: (text: any, record: DataSource, index: number) => React.ReactNode;

    /**
     * 列是否固定，可选 true(等效于 left) 'left' 'right'
     */
    fixed?: boolean | ('left' | 'right');
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
    pagination?: boolean;

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
    columnsMapping?: {
        [s: string]: any;
    };
}

export class TablePropsInterface extends BasicContainerPropsInterface {
    info: TableConfig;
}

class TableDriver extends Table<DataSource> {

}

interface TableStateInterface {
    total: number;
    current: number;
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

    private renderColumnItem(columns: TableColumnsItem[]) {
        columns = columns.map(co => {
            if (co.controls) {
                co.render = ((text: any, record: DataSource, index: number) => {
                    let childElements = co.controls!.map(childInfo => {
                        return createChild(childInfo, {
                            key: `${childInfo.type}_${index}`,
                            info: childInfo,
                            $data: this.props.$data,
                            $row: Map(record),
                            $index: index
                        });
                    });
                    return (
                        <div className={co.className} key={index}>
                            {childElements}
                        </div>
                    );
                });
            }

            return co;
        });

        return columns;
    }
    
    // private columnsMapping() {
    //    
    // }

    render() {
        let info = this.getPropsInfo(this.props.info);
        let dataSource: DataSource[] = [];
        let columns: TableColumnsItem[] = [];

        if (Array.isArray(info.columns)) {
            columns = info.columns;
        }

        if (Array.isArray(info.dataSource)) {
            dataSource = info.dataSource;
        }

        // if (info.columnsMapping) {
        //
        // }
        
        columns = this.renderColumnItem(columns);

        let tableProps = this.mapTableOptions(info);
        
        return (
            <TableDriver
                rowKey={'test'}
                columns={columns}
                dataSource={dataSource}
                {...tableProps}
            />
        );
    }
}

componentLoader.addComponent('table', AbstractTable, TablePropsInterface);