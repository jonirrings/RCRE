## 结合时间区域选择

可以在content中嵌入自定义组件，并可以实现一些复杂的逻辑功能

```json
{
    "body": [
        {
            "type": "container",
            "model": "time",
            "dataCustomer": {
                "customers": [
                    {
                        "mode": "location",
                        "name": "locationJump",
                        "config": {
                            "href": "/component/popover",
                            "params": {
                                "startTime": "#ES{$trigger.locationJump.startTime}",
                                "endTime": "#ES{$trigger.locationJump.endTime}"
                            }
                        }
                    }
                ]
            },
            "children": [
                {
                    "type": "popover",
                    "name": "timePop",
                    "triggerType": "click",
                    "content": {
                        "type": "rangePicker",
                        "name": "timeZone",
                        "pure": true,
                        "trigger": [
                            {
                                "event": "onComplete",
                                "targetCustomer": ["$this", "locationJump"],
                                "params": {
                                    "timePop": false,
                                    "startTime": "#ES{$args.startTime}",
                                    "endTime": "#ES{$args.endTime}" 
                                }
                            }
                        ]
                    },
                    "placement": "bottom",
                    "children": [
                        {
                            "type": "button",
                            "text": "click to select time"
                        }
                    ]
                }
            ]
        }
    ]
}
```