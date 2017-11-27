## 基础布局

添加`showBorder`可以看到布局容器的边框

```json
{
    "body": [
        {
            "type": "row",
            "showBorder": true,
            "children": [
                {
                    "type": "text",
                    "gridWidth": 40,
                    "text": "A"
                },
                {
                    "type": "text",
                    "gridCount": 2,
                    "text": "B"
                },
                {
                    "type": "text",
                    "gridWidth": 30,
                    "text": "C"
                },
                {
                    "type": "text",
                    "text": "D"
                }
            ]
        }
    ]
}
```