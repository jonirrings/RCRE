## 基础使用

设置`name`属性就可以让radio和数据模型保持同步

```json
{
    "body": [
        {
            "type": "container",
            "model": "radioTest",
            "children": [
                {
                    "type": "radio",
                    "name": "isReady",
                    "text": "Radio"
                },
                {
                    "type": "text",
                    "text": "#ES{$data.isReady}"
                }
            ]
        }
    ]
}
```