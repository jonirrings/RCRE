# Table 表格

基于Ant.design的Table组件进行实现. 用于展示行列数据

## 何时使用

+ 当有大量结构化的数据需要展现时；
+ 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 代码演示

{{demo}}

-----

## API

|         属性          |                说明                |           类型         |   是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: |
| bordered | 是否显示外边框 | boolean | false | false |
| columns | 列配置 | TableColumnsItem | true | - 
| dataSource | 数据源 | DataSource | true | -
| loading | 是否加载中 | boolean | false | true
| rowClassName | 行的CSS class | string | false | -
| showHeader | 是否显示表头 | boolean | false | true
| title | 表格标题 | string | false | -
| pagination | 是否含有分页 | boolean | false | true
| size | 表格大小 | 'default', 'middle', 'small' | false | default
| expandedRowKeys | 额外的展开行 | string[] | false | -
| locale.filterConfirm | 过滤确认文案 | string | false | 确认
| locale.filterReset | 重置文案 | string | false | 重置
| locale.emptyText | 清空文案 | string | false | -
| indentSize | 展示树形数据时，每层缩进的宽度，以 px 为单位 | number | false | -
| useFixedHeader | 固定表格头部 | boolean | false | false
| style | 内联CSS样式 | CSSProperties | false | -
| className | CSS class 名称 | string | false | -
| columnsMapping | 列属性映射 | TableColumnsItem | false | -
| dataSourceMapping | 值属性映射 | DataSource | false | -
| extendColumns | 表格扩展列 | TableColumnsItem[] | false | -
| customerColumnControls | 指定对一些列进行自定义渲染 | TableCustomerColumnControlItem[] | false | -


## 自定义渲染字段(TableCustomerColumnControlItem)

|         属性          |                说明                |           类型         |   是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: |
| dataIndex | 列数据在数据项中对应的Key | string | true | -
| controls | 自定义渲染组件 | BasicConfig[] | true | -
| className | 自定义渲染最外容器的className | string | false | -
| style | 自定义渲染最外层的内联CSS | string | false | -

## 表格列字段配置(TableColumnsItem)
|         属性          |                说明                |           类型         |   是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: |
| title | 表头标题 | string | true | -
| dataIndex | 列数据在数据项中对应的 key | string | true | -
| className |  列的 className | false | -
| fixed | 列是否固定，可选 true(等效于 left) 'left' 'right' | false | false