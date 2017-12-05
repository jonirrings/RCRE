## 分组选项

使用`optionsGroup`就可以设置分组选项

```json
{
    "body": [
        {
            "type": "container",
            "model": "group",
            "data": {
                "groups": [
                    {
                        "label": "分组1",
                        "options": [
                            {
                                "key": "A",
                                "value": "a"
                            },
                            {
                                "key": "B",
                                "value": "b"
                            }
                        ]
                    },
                    {
                        "label": "分组2",
                        "options": [
                            {
                                "key": "C",
                                "value": "c"
                            },
                            {
                                "key": "D",
                                "value": "d"
                            }
                        ]
                    }
                ]
            },
            "children": [
                {
                    "type": "select",
                    "name": "list",
                    "optionsGroup": "#ES{$data.groups}",
                    "defaultValue": "a"
                },
                {
                    "type": "text",
                    "text": "select value: #ES{$data.list}"
                }
            ]
        }
    ]
}
```