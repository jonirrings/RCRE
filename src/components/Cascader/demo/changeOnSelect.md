## 选择即改变

通过添加`changeOnSelect`属性让每次点击都更新数据

```json
{
    "body": [
        {
            "type": "container",
            "model": "cascaderChangeOnSelect",
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
                    "options": "#ES{$data.source}",
                    "changeOnSelect": true
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