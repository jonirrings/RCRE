## 计数器

绑定`trigger`属性， 并将`targetCustomer`传递给`$this`这个内置的dataCustomer上就可以实现同组件数据传输

```json
{
    "body": [
        {
            "type": "container",
            "model": "counter",
            "data": {
                "total": 0
            },
            "children": [
                {
                    "type": "row",
                    "children": [
                        {
                            "type": "text",
                            "text": "value: #ES{$data.total}"
                        }
                    ]
                },
                {
                    "type": "row",
                    "width": 200,
                    "children": [
                        {
                            "type": "button",
                            "text": "+1",
                            "trigger": [
                                {
                                    "event": "onClick",
                                    "targetCustomer": "$this",
                                    "params": {
                                        "total": "#ES{$data.total + 1}"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "button",
                            "text": "-1",
                            "trigger": [
                                {
                                    "event": "onClick",
                                    "targetCustomer": "$this",
                                    "params": {
                                        "total": "#ES{$data.total - 1}"
                                    }
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