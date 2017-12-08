## 扩展列

当columns属性是通过后端获取的，而前端也想继续添加一些自定义的columns配置。就需要`extendColumns`这个属性。

```json
{
    "body": [
        {
            "type": "container",
            "model": "extendColumns",
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
                        "company": "Baidu",
                        "id": 1
                    },
                    {
                        "name": "dongtiancheng",
                        "age": 21,
                        "company": "Baidu.inc",
                        "id": 2
                    }
                ]
            },
            "children": [
                {
                    "type": "table",
                    "columns": "#ES{$data.columns}",
                    "dataSource": "#ES{$data.dataSource}",
                    "extendColumns": [
                        {
                            "dataIndex": "id",
                            "title": "ID"
                        }
                    ]
                }
            ]
        }
    ]
}
```