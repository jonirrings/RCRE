## 动态时间范围

可以灵活的使用$moment执行来进行动态时间范围控制。

比如设置只允许选择今天，以及前面1周之内的时间。

关于$moment执行的使用方法，请看教程。

```json
{
    "body": [
        {
            "type": "container",
            "model": "dynamicDate",
            "children": [
                {
                    "type": "datePicker",
                    "name": "time",
                    "startTime": "#ES{$moment($data.time).subtract($data.range, 'days')}",
                    "endTime": "#ES{$moment($data.time).add($data.range, 'days')}",
                    "defaultValue": "#ES{$moment()}"
                },
                {
                    "type": "row",
                    "width": 400,
                    "children": [
                        {
                            "type": "text",
                            "text": "输入时间间隔的范围"
                        },
                        {
                            "type": "input",
                            "name": "range",
                            "inputType": "number",
                            "placeholder": "时间间隔的范围",
                            "defaultValue": 7
                        }
                    ]
                }
            ]
        }
    ]
}
```