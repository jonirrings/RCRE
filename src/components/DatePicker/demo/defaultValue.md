## 设置初始日期

日期的`defaultValue`和其他的不太一样。 因为日期一直都是变化的。

而且很多的需求都是设置当天，或者是当天的前面几天之类的。

在ExpressionString中，RCRE提供了`$now`这个内置变量来动态计算时间。

它是一个moment对象，因此可以直接调用moment.js API来使用

```json
{
    "body": [
        {
            "type": "row",
            "width": 400,
            "children": [
                {
                    "type": "container",
                    "model": "defaultTest",
                    "children": [
                        {
                            "type": "datePicker",
                            "name": "date",
                            "defaultValue": "#ES{$now}"
                        }
                    ]
                }   
            ]
        }
    ]
}
```