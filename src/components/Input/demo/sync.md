## 联动

配合`container`组件，就能很轻易的实现数据联动

```json
{
    "body": [
        {
            "type": "container",
            "model": "form",
            "children": [
                {
                    "type": "input",
                    "name": "sync",
                    "addonBefore": "Text"
                },
                {
                    "type": "text",
                    "text": "Input value: #ES{$data.sync}"
                }
            ]
        }
    ]
}
```