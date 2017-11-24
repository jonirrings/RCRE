import * as React from 'react';
import {CSSProperties} from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import componentLoader from '../../render/util/componentLoader';
import {Pagination} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {IsBoolean, IsNumber, IsString} from 'class-validator';

export class PaginationConfig extends BasicConfig {

    /**
     * 当前页数
     */
    @IsNumber()
    current?: number;

    /**
     * 默认当前页数
     */
    defaultCurrent: number;

    /**
     * 默认每页条数
     */
    defaultPageSize: number;

    /**
     * 是否可以快速跳转至某页
     */
    @IsBoolean()
    showQuickJumper?: boolean;

    /**
     * 是否可以改变pageSize
     */
    @IsBoolean()
    showSizeChanger?: boolean;

    /**
     * 当添加该属性时，显示为简单分页
     */
    @IsBoolean()
    simple?: boolean;

    /**
     * 默认每页条数
     */
    pageSizeOptions: string[];

    /**
     * pagination大小
     * @public
     */
    @IsString()
    size?: 'small' | '';

    /**
     * 数据总数
     */
    total: number;

    /**
     * 每页条数
     */
    pageSize: number;

    /**
     * 内联CSS属性
     */
    style?: CSSProperties;
}

export class PaginationPropsInterface extends BasicContainerPropsInterface {
    info: PaginationConfig;
}

export class PaginationStateInterface {

}

export class AbstractPagination extends BasicContainer<PaginationPropsInterface, PaginationStateInterface> {
    constructor() {
        super();
    }

    private mapPaginationProps(info: PaginationConfig): PaginationProps {
        return {
            total: info.total,
            pageSize: info.pageSize,
            current: info.current,
            defaultCurrent: info.defaultCurrent,
            defaultPageSize: info.defaultPageSize,
            pageSizeOptions: info.pageSizeOptions,
            showQuickJumper: info.showQuickJumper,
            showSizeChanger: info.showSizeChanger,
            simple: info.simple,
            size: info.size
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        let paginationProps = this.mapPaginationProps(info);

        return (
            <Pagination
                {...paginationProps}
                onShowSizeChange={(current: number, size: number) => {
                    this.commonEventHandler('onShowSizeChange', {
                        current: current,
                        size: size
                    });
                }}
                onChange={(page: number, pageSize: number) => {
                    this.commonEventHandler('onChange', {
                        page: page,
                        pageSize: pageSize
                    });
                }}
            />
        );
    }
}

componentLoader.addComponent('pagination', AbstractPagination, PaginationPropsInterface);