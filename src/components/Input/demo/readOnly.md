## 只读模式

设置`readOnly`就可以让输入框为只读模式

```json
{
    "body": [
        {
            "type": "container",
            "model": "form",
            "data": {
                "readonly": "readonly text"
            },
            "children": [
                {
                    "type": "input",
                    "name": "readonly",
                    "readOnly": true
                }
            ]
        }
    ]
}
```