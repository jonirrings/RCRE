## 默认日期

通过`defaultValue`来设置默认日期

```json
{   
    "body": [
        {
            "type": "container",
            "model": "defaultRange",
            "children": [
                {
                    "type": "rangePicker",
                    "name": "dateRange",
                    "defaultValue": ["2017-12-01", "2017-12-22"]
                }
            ]
        }
    ]
}
```