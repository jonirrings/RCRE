## 成组的单选框

多个单选框同享同一个`name`值的时候，需要使用`options`属性

```json
{
    "body": [
        {
            "type": "container",
            "model": "radioGroup",
            "children": [
                {
                    "type": "text",
                    "text": "中午吃啥？"
                },
                {
                    "type": "radio",
                    "name": "food",
                    "options": [
                        {
                            "label": "苹果",
                            "value": "apple"
                        },
                        {
                            "label": "葡萄",
                            "value": "grapes"
                        },
                        {
                            "label": "草莓",
                            "value": "strawberry"
                        }
                    ]
                },
                {
                    "type": "text",
                    "text": "#ES{$data.food}"
                }
            ]
        }
    ]
}
```