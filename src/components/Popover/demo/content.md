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
                        "type": "container",
                        "model": "remote",
                        "dataProvider": [
                            {
                                "mode": "ajax",
                                "config": {
                                    "url": "https://api.github.com",
                                    "method": "GET"
                                }
                            }
                        ],
                        "children": [
                            {
                                "type": "text",
                                "text": "loading...",
                                "hidden": "#ES{!$data.$loading}"
                            },
                            {
                                "type": "text",
                                "text": "#ES{$data.authorizations_url}",
                                "textType": "link",
                                "href": "#ES{$data.authorizations_url}"
                            }
                        ]
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