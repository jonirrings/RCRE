## 自定义渲染弹出框内容

content属性不仅仅可以填字符串，也可以填自定义渲染的组件

```json
{
    "body": [
        {
            "type": "container",
            "model": "popOverContainer",
            "children": [
                 {
                     "type": "popover",
                     "name": "popOverState",
                     "content": {
                        "type": "datePicker",
                        "name": "time"
                     },
                     "triggerType": "click",
                     "children": [
                         {
                             "type": "button",
                             "text": "click"
                         }
                     ]
                 }   
            ]
        }
    ]
}
```