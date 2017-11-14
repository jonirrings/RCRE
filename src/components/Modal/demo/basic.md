## 基础使用

基本的点击和取消

```json
{
    "body": [
        {
            "type": "container",
            "model": "modalState",
            "dataCustomer": {
                "customers": [
                    {
                        "mode": "pass",
                        "name": "setData",
                        "config": {
                            "model": "modalState",
                            "assign": {
                                "visible": "#ES{$trigger.setData.visible}"
                            }
                        }
                    }
                ]
            },
            "data": {
                "visible": false
            },
            "children": [
                {
                    "type": "button",
                    "text": "点击出弹框",
                    "trigger": [
                        {
                            "event": "onClick",
                            "targetCustomer": "setData",
                            "params": {
                                "visible": true
                            }
                        }
                    ]
                },
                {
                    "type": "modal",
                    "visible": "#ES{$data.visible}",
                    "children": [
                        {
                            "type": "text",
                            "text": "this is content"
                        }
                    ],
                    "trigger": [
                        {
                            "event": "onOk",
                            "targetCustomer": "setData",
                            "params": {
                                "visible": false
                            }
                        },
                        {
                            "event": "onCancel",
                            "targetCustomer": "setData",
                            "params": {
                                "visible": false
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```