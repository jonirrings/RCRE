## 没有动画

设置`animated`为false，就可以让切换没有动画

```json
{
    "body": [
        {
            "type": "tabs",
            "animated": false,
            "tabs": [
                {
                    "title": "A",
                    "children": [
                        {
                            "type": "text",
                            "text": "AAA"
                        }
                    ]
                },
                {
                    "title": "B",
                    "children": [
                        {
                            "type": "text",
                            "text": "BBB"
                        }
                    ]
                }
            ]
        }
    ]
}
```