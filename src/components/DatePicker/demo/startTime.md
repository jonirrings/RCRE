## 设置起始时间

通过`startTime`属性来设置起始时间

```json
{
    "body": [
        {
            "type": "container",
            "model": "dateData",
            "children": [
                {
                    "type": "row",
                    "width": 400,
                    "children": [
                        {
                            "type": "text",
                            "text": "请输入时间间隔",
                            "gridCount": 4
                        },
                        {
                            "type": "input",
                            "name": "range",
                            "inputType": "number",
                            "gridCount": 3
                        }
                    ]
                },
                {
                    "type": "datePicker",
                    "name": "time",
                    "startTime": "#ES{$data.time.subtract(10, 'days')}"
                }
            ]
        }
    ]
}
```