## 相对偏移

如果还想要更精确的定位方式，可以使用`gridLeft`和`gridTop`来进行像素级相对偏移

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
                    "gridLeft": 20,
                    "gridTop": 10,
                    "text": "A"
                },
                {
                    "type": "text",
                    "gridCount": 2,
                    "gridLeft": 30,
                    "gridTop": -20,
                    "text": "B"
                },
                {
                    "type": "text",
                    "gridWidth": 30,
                    "gridLeft": 5,
                    "gridTop": -50,
                    "text": "C"
                },
                {
                    "type": "text",
                    "gridLeft": 500,
                    "gridTop": 10,
                    "text": "D"
                }
            ]
        }
    ]
}
```