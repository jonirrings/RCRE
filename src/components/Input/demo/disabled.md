## 禁用

直接设置`disabled`属性就能让输入框禁用输入

不过可以借助`container`组件来实现一些动态的效果

```json
{
    "body": [
        {
            "type": "container",
            "model": "form",
            "children": [
                {
                    "type": "input",
                    "name": "disabledDemo",
                    "addonBefore": "Text",
                    "disabled": "#ES{$data.disableInput}"
                },
                {
                    "type": "checkbox",
                    "name": "disableInput",
                    "size": "large",
                    "text": "禁用输入框"
                }
            ]
        }
    ]
}
```