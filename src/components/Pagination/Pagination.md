# Pagination 分页

分页器

## 代码演示

{{demo}}

## API

|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: | 
| name | Pagination的数据模型Key | string | true | - |
| total | 数据总量 | number | true | - |
| current | 当前页数 | number | false | 1 |
| defaultCurrent | 默认的页数 | number | false | - | 
| pageSize | 每页的条数 | number | false | 10 |
| showQuickJumper | 显示快速跳转至某页的控件 | boolean | false | false |
| showSizeChanger | 显示更改页面大小的空间 | boolean | false | false |
| showTotal | 额外渲染总量和区域 | string | false | false |
| simple | 简单分页模式 | boolean | false | false |

## showTotal额外嵌入的变量

|   属性 |                    类型                    |  说明 |
| :-----------------: | :--------------------------------------: | :-----: | 
| $total | number | 数据总量 |
| $range | [number, number] | 数组第一个元素是区域开始，第二个是区域结尾 | 