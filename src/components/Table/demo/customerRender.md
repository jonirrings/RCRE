## 自定义渲染

可以通过`customerColumnControls`属性来对某一列进行自定义数据渲染


```json
{
    "body": [
        {
            "type": "container",
            "model": "customerRender",
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
                    "dataSource": "#ES{$data.dataSource}",
                    "customerColumnControls": [
                        {
                            "dataIndex": "name",
                            "controls": [
                                {
                                    "type": "text",
                                    "text": "#ES{$item.name}",
                                    "style": {
                                        "color": "red"
                                    }
                                }
                            ]
                        },
                        {
                            "dataIndex": "age",
                            "controls": [
                                {
                                    "type": "button",
                                    "text": "#ES{$item.age}"
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
