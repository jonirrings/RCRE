## 基础使用

传入options属性就可以使用了

```json
{
    "body": [
        {
            "type": "container",
            "model": "selectModal",
            "data": {
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
            "children": [
                {
                    "type": "select",
                    "name": "list",
                    "options": "#ES{$data.options}",
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