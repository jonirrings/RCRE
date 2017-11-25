## 快速跳转

添加`showQuickJumper`属性添加快速跳转到某页

```json
{
    "body": [
        {
            "type": "container",
            "model": "quick",
            "children": [
                {
                    "type": "pagination",
                    "name": "quickJump",
                    "showQuickJumper": true,
                    "total": 50
                }
            ]
        }
    ]
}
```