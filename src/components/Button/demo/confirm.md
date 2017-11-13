## 点击确认

可以添加confirm属性来让用户再次确认点击

confirm属性会给Button组件添加`onConfirm`和`onCancel`事件. 分别对应再次点击确认, 和点击取消

```json
{
    "body": [
        {
            "type": "container",
            "model": "buttonState",
            "data": {
                "state": "-"
            },
            "dataCustomer": {
                "customers": [
                    {
                        "mode": "pass",
                        "name": "confirmDataPass",
                        "config": {
                            "model": "buttonState",
                            "assign": {
                                "state": "#ES{$trigger.confirmDataPass.state}"
                            }  
                        }
                    }
                ]
            },
            "children": [
                {
                    "type": "row",
                    "width": 500,
                    "children": [
                        {
                            "type": "button",
                            "text": "confirmExample",
                            "gridCount": 4,
                            "confirm": {
                                "title": "ConFirm Title"
                            },
                            "trigger": [
                                {
                                    "event": "onConfirm",
                                    "targetCustomer": "confirmDataPass",
                                    "params": {
                                        "state": "confirmed"
                                    }
                                },
                                {
                                    "event": "onCancel",
                                    "targetCustomer": "confirmDataPass",
                                    "params": {
                                        "state": "canceled"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "gridCount": 4,
                            "text": "confirm state: #ES{$data.state}"
                        }
                    ]
                }
            ]
        }
    ]
}
```