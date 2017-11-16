## 标签页式切换

设置`tabType`为card就可以使用标签页式切换

```json
{
    "body": [
        {
            "type": "tabs",
            "tabType": "card",
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