## 带标签的输入框

添加`addonBefore`或者`addonAfter`属性来让输入框添加标签

```json
{
    "body": [
        {
            "type": "container",
            "model": "form",
            "children": [
                {
                    "type": "input",
                    "name": "addonInput",
                    "addonBefore": "Before"
                },
                {
                    "type": "input",
                    "name": "addonInputAfter",
                    "addonAfter": "After"
                }
            ]
        }
    ]
}
```