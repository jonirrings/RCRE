## 选项值映射

当接口数据和Select组件所需要的数据字段不一致的时候,可以使用 `optionsMapping`

```json
{
    "body": [
        {
            "type": "container",
            "model": "selectModal",
            "data": {
                "options": [
                    {
                        "label": "A",
                        "text": "a"
                    },
                    {
                        "label": "B",
                        "text": "b"
                    }
                ]
            },
            "children": [
                {
                    "type": "select",
                    "name": "list",
                    "options": "#ES{$data.options}",
                    "optionsMapping": {
                        "key": "#ES{$item.label}",
                        "value": "#ES{$item.text}"
                    },
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