## 和container组件联动

配合container组件，可以联动数据

```json
{
    "body": [
        {
            "type": "container",
            "model": "tabs",
            "dataCustomer": {
                "customers": [
                    {
                        "mode": "pass",
                        "name": "passData",
                        "config": {
                            "model": "tabs",
                            "assign": {
                                
                            }
                        }
                    }
                ]
            },
            "children": [
                {
                    "type": "tabs",
                    "name": "tabPanel",
                    "activeKey": "#ES{$data.tabActiveKey}",
                    "trigger": [
                        {
                            "event": "onTabClick",
                            "targetCustomer": "passData",
                            "params": {
                                "activeKey": "#ES{$data.}"
                            }
                        }
                    ],
                    "tabs": [
                        {
                            "title": "A",
                            "children": [
                                {
                                    "type": "text",
                                    "text": "AAA"
                                }
                            ]
                        },
                        {
                            "title": "B",
                            "children": [
                                {
                                    "type": "text",
                                    "text": "BBB"
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