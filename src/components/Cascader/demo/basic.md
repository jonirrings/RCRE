## 基础使用

Cascader需要依赖`container`组件才能正常运行. 通过传递到`options`属性就可以了

```json
{
    "body": [
        {
            "type": "container",
            "model": "cascaderData",
            "data": {
                "source": [
                    {
                        "label": "A",
                        "value": "a",
                        "children": [
                            {
                                "label": "B",
                                "value": "b",
                                "children": [
                                    {
                                        "label": "C",
                                        "value": "c"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "label": "123",
                        "value": "123",
                        "children": [
                            {
                                "label": "456",
                                "value": "456"
                            }
                        ]
                    }
                ]
            },
            "children": [
                {
                    "type": "cascader",
                    "name": "place_id",
                    "options": "#ES{$data.source}"
                },
                {
                    "type": "text",
                    "text": "#ES{'selected value: ' + JSON.stringify($data.place_id)}"
                }
            ]
        }
    ]
}
```