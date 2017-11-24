## 列属性映射

如果遇到数据接口字段和组件要求不一致的情况, 可以通过`columnsMapping`属性来做一些接口上的兼容

```json
{
    "body": [
        {
            "type": "container",
            "model": "columnsMapping",
            "data": {
                "columns": [
                    {
                        "name": "名字",
                        "value": "name"
                    },
                    {
                        "name": "年龄",
                        "value": "age"
                    },
                    {
                        "name": "公司",
                        "value": "company"
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
                    "dataSource": "#ES{$data.dataSource}",
                    "columnsMapping": {
                        "title": "#ES{$item.name}",
                        "dataIndex": "#ES{$item.value}"
                    }
                }
            ]
        }
    ]
}
```