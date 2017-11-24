## 基础使用

选择日期， 需要配合container组件使用

```json
{
    "body": [
        {
            "type": "container",
            "model": "date",
            "children": [
                {
                    "type": "datePicker",
                    "name": "time"
                },
                {
                    "type": "text",
                    "text": "#ES{$data.time}"
                }
            ]
        }
    ]
}
```