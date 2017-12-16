## 移入展开

通过鼠标移入来展开菜单

```json
{
    "body": [
        {
            "type": "container",
            "model": "cascaderTrigger",
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
                    "expandTrigger": "hover"
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