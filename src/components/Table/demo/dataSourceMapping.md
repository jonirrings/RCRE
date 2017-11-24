## 数据源映射

如果遇到数据源的字段和需要的不一致, 也可以使用`dataSourceMapping`属性来进行兼容

```json
{
    "body": [
        {
            "type": "container",
            "model": "dataSourceMapping",
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
                        "vName": "andycall",
                        "age": 21,
                        "company": "Baidu"
                    },
                    {
                        "vName": "dongtiancheng",
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
                    "dataSourceMapping": {
                        "name": "#ES{$item.vName}"
                    }
                }
            ]
        }
    ]
}
```