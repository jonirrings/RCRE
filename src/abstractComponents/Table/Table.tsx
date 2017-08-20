import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';

export class TableDataSourceItem {
}

export class TableColumnsItem {
    title?: string;
    key?: string;
    dataIndex?: string;
}

export class TableConfig extends BasicConfig {
    dataSource: TableDataSourceItem[];
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
        return this.getComponentThroughDriver();
    }
}