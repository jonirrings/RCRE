## 基础使用

只需要设置`name`属性就能直接使用。

RangePicker写入到数据模型中的值是一个数组, [开始时间， 结束时间]

```json
{   
    "body": [
        {
            "type": "container",
            "model": "rangePicker",
            "children": [
                {
                    "type": "rangePicker",
                    "name": "dateRange"
                }
            ]
        }
    ]
}
```