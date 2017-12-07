## 使用自定义组件来取代默认的Input

设置`pure`属性为true， 可以直接显示时间区域框

```json
{
    "body": [
        {
            "type": "container",
            "model": "customRangePicker",
            "children": [
                {
                    "type": "rangePicker",
                    "name": "time",
                    "pure": true
                }
            ]
        }
    ]
}
```