## 基础布局

使用`gridWidth`可以固定容器的宽度
使用`gridCount`可以相对父级容器进行动态适配

```json
{
    "debug": true,
    "body": [
        {
            "type": "row",
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