import * as React from 'react';
import {CSSProperties} from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import componentLoader from '../../render/util/componentLoader';
import {Pagination} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';
import {IsBoolean, IsNumber, IsString} from 'class-validator';
import {isExpression, parseExpressString} from '../../render/util/vm';

export class PaginationConfig extends BasicConfig {
    /**
     * 数据模型Key
     */
    name: string;
    
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
     * 自定义翻页元素
     */
        // TODO 自定义翻页元素渲染
    itemControls?: BasicConfig[];

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
     * 使用ExpressionString来显示全部数据
     */
    @IsBoolean()
    showTotal?: string;

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

        this.handleChange = this.handleChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    }

    componentDidMount() {
        let info = this.props.info;

        if (this.props.$setData && info.name) {
            const $setData = this.props.$setData;
            const data: {
                current?: number;
                pageSize?: number;
            } = {};

            data.current = info.current || info.defaultCurrent || 1;
            data.pageSize = info.pageSize || info.defaultPageSize || 10;

            setTimeout(() => {
                $setData(info.name, data);
            });
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info, this.props, ['showTotal']);

        if (!info.name) {
            const msg = 'name property is required for pagination component';
            if (this.context.debug) {
                return <div>{msg}</div>;
            } else {
                console.error(msg);
                return <div/>;
            }
        }

        if (!this.props.$data) {
            console.error('pagination component should be under container component');
        }
        
        let paginationProps = this.mapPaginationProps(info);
        let current = info.current || 1;
        let pageSize = info.pageSize || 10;
        if (this.props.$data) {
            let paginationData = this.props.$data.get(info.name) || {
                current: 1,
                pageSize: 10
            };

            current = paginationData.current;
            pageSize = paginationData.pageSize;
        }

        if (info.showTotal && isExpression(info.showTotal)) {
            paginationProps.showTotal = (total: number, range: [number, number]) => {
                let runTime = this.getRuntimeContext();
                return parseExpressString(info.showTotal!, {
                    $total: total,
                    $range: range,
                    ...runTime
                });
            };
        }
        
        return (
            <Pagination
                {...paginationProps}
                current={current}
                pageSize={pageSize}
                onShowSizeChange={this.handlePageSizeChange}
                onChange={this.handleChange}
            />
        );
    }

    private handleChange(page: number, size: number) {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, {
                current: page,
                pageSize: size
            });
        }
    }

    private handlePageSizeChange(cur: number, size: number) {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, {
                current: cur,
                pageSize: size
            });
        }
    }

    private mapPaginationProps(info: PaginationConfig): PaginationProps {
        return {
            total: info.total,
            showQuickJumper: info.showQuickJumper,
            showSizeChanger: info.showSizeChanger,
            simple: info.simple
        };
    }
}

componentLoader.addComponent('pagination', AbstractPagination, PaginationPropsInterface);