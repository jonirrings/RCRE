## 更改列的宽度

通过在columns配置里面添加width属性来设置列的宽度。

如果columns是通过ExpressionString渲染得到的。那么也可以在customerColumnControls中添加

```json
{
    "body": [
        {
            "type": "container",
            "model": "width",
            "data": {
                "columns": [
                    {
                        "title": "名字",
                        "dataIndex": "name"
                    },
                    {
                        "title": "年龄",
                        "dataIndex": "age",
                        "width": 40
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
                    "dataSource": "#ES{$data.dataSource}",
                    "customerColumnControls": [
                        {
                            "dataIndex": "name",
                            "width": 50,
                            "controls": [
                                {
                                    "type": "text",
                                    "text": "#ES{$item.name}"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```