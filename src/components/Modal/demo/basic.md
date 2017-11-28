## 基础使用

基本的点击和取消

```json
{
    "body": [
        {
            "type": "container",
            "model": "modalState",
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
                            "targetCustomer": "$this",
                            "params": {
                                "modalVisible": true
                            }
                        }
                    ]
                },
                {
                    "type": "modal",
                    "name": "modalVisible",
                    "children": [
                        {
                            "type": "text",
                            "text": "this is content"
                        }
                    ]
                }
            ]
        }
    ]
}
```