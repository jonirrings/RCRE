## 触发类型

设置`triggerType`可以设置弹出框的触发方式

```json
{
    "body": [
        {
            "type": "popover",
            "triggerType": "click",
            "title": "clicked",
            "content": "you clicked me",
            "children": [
                {
                    "type": "button",
                    "text": "click"
                }
            ]
        }
    ]
}
```