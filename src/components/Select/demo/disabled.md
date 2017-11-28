## 禁用

添加`disabled`属性就能让select组件禁用

```json
{
    "body": [
        {
            "type": "container",
            "model": "disabledSelect",
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
                    "name": "disabled",
                    "disabled": true,
                    "options": "#ES{$data.options}"
                }
            ]
        }
    ]
}
```