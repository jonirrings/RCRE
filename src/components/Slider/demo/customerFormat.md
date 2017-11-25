## 自定义提示

使用`tipFormat`即可调用Expression String来自定义ToolTip的输出。

调用上下文中将注入一个`$value`值来代表当前Slider的值

```json
{
    "body": [
        {
            "type": "container",
            "model": "sliderDemo",
            "children": [
                {
                    "type": "slider",
                    "name": "sliderDemo",
                    "tipFormat": "value: #ES{$value} %"
                }
            ]
        }
    ]
}
```