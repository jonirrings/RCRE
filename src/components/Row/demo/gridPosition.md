## 相对定位

在容器内部，可以使用`gridPosition`属性来让内部元素相对容器进行定位

```json
{
    "body": [
        {
            "type": "row",
            "minHeight": 100,
            "showBorder": true,
            "children": [
                {
                    "type": "text",
                    "gridPosition": "top-left",
                    "text": "A"
                },
                {
                    "type": "text",
                    "gridPosition": "top-right",
                    "text": "B"
                },
                {
                    "type": "text",
                    "gridPosition": "middle-center",
                    "text": "C"
                },
                {
                    "type": "text",
                    "gridPosition": "bottom-left",
                    "text": "D"
                },
                {
                    "type": "text",
                    "gridPosition": "bottom-right",
                    "text": "E"
                }
            ]
        }
    ]
}
```