import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import componentLoader from '../../render/util/componentLoader';
import {Pagination} from 'antd';
import {PaginationProps} from 'antd/lib/pagination';

export class PagninationConfig extends BasicConfig {
    text: string;

    /**
     * 数据总数
     */
    total: number;
}

export class PaginationPropsInterface extends BasicContainerPropsInterface {
    info: PagninationConfig;
}

export class PaginationStateInterface {

}

export class AbstractPagination extends BasicContainer<PaginationPropsInterface, PaginationStateInterface> {
    constructor() {
        super();
    }

    private mapPaginationProps(info: PagninationConfig): PaginationProps {
        return {
            total: info.total
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        let paginationProps = this.mapPaginationProps(info);
        
        return <Pagination 
            {...paginationProps}
            onShowSizeChange={(current: number, size: number) => {
                this.commonEventHandler('onShowSizeChange', [current, size]);
            }}
        />;
    }

    private commonEventHandler(eventName: string, params: number[]) {
        if (this.props.eventHandle) {
            this.props.eventHandle(eventName, params);
        } else {
            console.error('Event System only can work with container component');
        }
    }
}

componentLoader.addComponent('pagination', AbstractPagination, PaginationPropsInterface);