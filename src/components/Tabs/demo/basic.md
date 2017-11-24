## 基础使用

`Tabs`组件可以不借助container组件就可以使用

```json
{
    "body": [
        {
            "type": "tabs",
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