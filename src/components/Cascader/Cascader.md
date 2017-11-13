# Cascader 级联选择

## 基础使用

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
                }
            ]
        }
    ]
}
```