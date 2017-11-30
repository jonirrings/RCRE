## 日期格式

`format`属性可以设置组件写入到数据模型和展示的时间格式

```json
{
    "body": [
        {
            "type": "container",
            "model": "format",
            "children": [
                {
                    "type": "row",
                    "width": 400,
                    "children": [
                        {
                            "type": "datePicker",
                            "name": "time",
                            "format": "YYYYMMDD",
                            "defaultValue": "#ES{$now}"
                        },
                        {
                            "type": "text",
                            "text": "#ES{$data.time}"
                        }
                    ]
                }
            ]
        }
    ]
}
```