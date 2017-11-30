## 不显示今天

把`showToday`改成false就可以不显示今天按钮

```json
{
    "body": [
        {
            "type": "container",
            "model": "showToday",
            "children": [
                {
                    "type": "datePicker",
                    "name": "time",
                    "showToday": false
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