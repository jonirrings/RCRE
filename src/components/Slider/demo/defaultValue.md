## 设置初始值

添加`defaultValue`属性就能设置模型的属性值


```json
{
    "debug": true,
    "body": [
        {
            "type": "container",
            "model": "default",
            "children": [
                {
                    "type": "slider",
                    "name": "demo",
                    "defaultValue": 50
                }
            ]
        }
    ]
}
```