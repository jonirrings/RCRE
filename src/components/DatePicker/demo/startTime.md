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
                            "gridWidth": 120
                        },
                        {
                            "type": "input",
                            "name": "range",
                            "inputType": "number"
                        }
                    ]
                },
                {
                    "type": "row",
                    "width": 400,
                    "children": [
                            {
                                "type": "text",
                                "text": "选择日期",
                                "gridWidth": 120
                            },
                            {
                                "type": "datePicker",
                                "name": "time"
                            }
                    ]
                }
            ]
        }
    ]
}
```