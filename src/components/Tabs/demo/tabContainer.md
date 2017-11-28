## 嵌入Container组件

如果在Tabs中嵌套Container组件， 一定要注意不同tab下面的container组件的model都要保证不相同

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
                            "type": "container",
                            "model": "AAA",
                            "data": {
                                "text": "A"
                            },
                            "children": [
                                {
                                    "type": "text",
                                    "text": "#ES{$data.text}"
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "B",
                    "children": [
                        {
                            "type": "container",
                            "model": "BBB",
                            "data": {
                                "text": "B"
                            },
                            "children": [
                                {
                                    "type": "text",
                                    "text": "#ES{$data.text}"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```