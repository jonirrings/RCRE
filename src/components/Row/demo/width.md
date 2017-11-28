## 容器总宽度

在默认情况下，Row组件会自动保持和父级一样的宽度，
这样也会引起在不同的屏幕尺寸在Row组件的宽度不一致，使得使用gridCount的组件的宽度无法固定。

所以可以使用`width`属性来给`row`组件指定一个固定的宽度

```json
{
    "debug": true,
    "body": [
        {  
            "type": "row",
            "width": 500,
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