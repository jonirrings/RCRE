## 基础使用

Popover组件需要提供子级可挂载的元素。比如挂载在Text组件上 

```json
{
    "body": [
        {
            "type": "popover",
            "title": "test",
            "content": "helloworld",
            "children": [
                {
                    "type": "text",
                    "text": "hover me"
                }
            ]
        }
    ]
}
```