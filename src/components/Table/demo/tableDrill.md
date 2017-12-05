## 表格下钻

通过表格自定义渲染这个功能, 来让可以针对表格的某一列进行各种操作.

```json
{
    "body": [
        {
            "type": "container",
            "model": "tableDrill",
            "data": {
                "head": [
                    {
                        "key": "stdatetime",
                        "value": "时刻"
                    },
                    {
                        "key": "value",
                        "value": "当日值"
                    },
                    {
                        "key": "day2day",
                        "value": "日环比"
                    },
                    {
                        "key": "day2week",
                        "value": "周同比"
                    },
                    {
                        "key": "total",
                        "value": "当日值累计"
                    }
                ],
                "body": [
                    {
                        "stdatetime": "23:45:00",
                        "value": 1530870,
                        "day2day": 1403485,
                        "day2week": 1435203,
                        "total": 145702652
                    },
                    {
                        "stdatetime": "23:30:00",
                        "value": 1718509,
                        "day2day": 1600291,
                        "day2week": 1628057,
                        "total": 144171782
                    },
                    {
                        "stdatetime": "23:15:00",
                        "value": 1903553,
                        "day2day": 1792581,
                        "day2week": 1832274,
                        "total": 142453273
                    },
                    {
                        "stdatetime": "23:00:00",
                        "value": 2200251,
                        "day2day": 1966918,
                        "day2week": 2028260,
                        "total": 140549720
                    },
                    {
                        "stdatetime": "22:45:00",
                        "value": 2399402,
                        "day2day": 2125217,
                        "day2week": 2230313,
                        "total": 138349469
                    },
                    {
                        "stdatetime": "22:30:00",
                        "value": 2618642,
                        "day2day": 2294294,
                        "day2week": 2421474,
                        "total": 135950067
                    }
                ]
            },
            "children": [
                {
                    "type": "table",
                    "columns": "#ES{$data.head}",
                    "columnsMapping": {
                        "dataIndex": "#ES{$item.key}",
                        "title": "#ES{$item.value}",
                        "key": "#ES{$item.key}"
                    },
                    "dataSource": "#ES{$data.body}",
                    "customerColumnControls": [
                        {
                            "dataIndex": "stdatetime",
                            "style": {
                                "color": "red"
                            }
                        },
                        {
                            "dataIndex": "day2day",
                            "controls": [
                                {
                                    "type": "container",
                                    "model": "table_item_#ES{$index}",
                                    "data": {
                                        "index": "#ES{$index}"
                                    },
                                    "children": [
                                        {
                                            "type": "button",
                                            "text": "showModal",
                                            "trigger": [
                                                {
                                                    "event": "onClick",
                                                    "targetCustomer": "$this",
                                                    "params": {
                                                        "tableModal": "#ES{!$data.tableModal}"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "type": "modal",
                                            "name": "tableModal",
                                            "children": [
                                                {
                                                    "type": "text",
                                                    "text": "index: #ES{$data.index}"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "stdatetime: #ES{$item.stdatetime}"
                                                }
                                            ]
                                        }
                                    ]
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