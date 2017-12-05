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
                                "type": "datePicker",
                                "name": "time",
                                "startTime": "2017-12-04",
                                "defaultValue": "2017-12-04"
                            }
                    ]
                }
            ]
        }
    ]
}
```