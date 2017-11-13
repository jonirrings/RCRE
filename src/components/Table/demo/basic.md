## 基础使用

渲染最简单的表格只需要配置`columns`和`dataSource`即可

Table组件需要依赖`container`组件来提供数据.

+ columns, 配置表头, 以及每一列的数据字段
+ dataSource. 结构化数据源

```json
{
    "body": [
        {
            "type": "container",
            "model": "tableBasic",
            "data": {
                "columns": [
                    {
                        "title": "名字",
                        "dataIndex": "name"
                    },
                    {
                        "title": "年龄",
                        "dataIndex": "age"
                    },
                    {
                        "title": "公司",
                        "dataIndex": "company"
                    }
                ],
                "dataSource": [
                    {
                        "name": "andycall",
                        "age": 21,
                        "company": "Baidu"
                    },
                    {
                        "name": "dongtiancheng",
                        "age": 21,
                        "company": "Baidu.inc"
                    }
                ]
            },
            "children": [
                {
                    "type": "table",
                    "columns": "#ES{$data.columns}",
                    "dataSource": "#ES{$data.dataSource}"
                }
            ]
        }
    ]
}
```