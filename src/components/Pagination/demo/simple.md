## 简单分页

添加`simple`属性就可以变成简单分页模式

```json
{
    "debug": true,
    "body": [
        {
            "type": "container",
            "model": "simple",
            "data": {
            },
            "children":[
                {
                    "type": "pagination",
                    "name": "simplepage",
                    "total": 50,
                    "simple": true
                }
            ]
        }
    ]
}
```