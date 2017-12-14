## 显示连接线

添加`showLine`属性来显示连接线

```json
{
    "body": [
        {
            "type": "container",
            "model": "treeShowLine",
            "children": [
                {
                    "type": "tree",
                    "name": "tree",
                    "checkable": true,
                    "multiple": true,
                    "showLine": true,
                    "trigger": [
                        {
                            "event": "onSelect",
                            "targetCustomer": "$this",
                            "params": {
                                "selectedKeys": "#ES{$args.selectedKeys}"
                            }
                        },
                        {
                            "event": "onCheck",
                            "targetCustomer": "$this",
                            "params": {
                                "checkedKeys": "#ES{$args.checkedKeys}"
                            }
                        }
                    ],
                    "options": [
                        {
                            "title": "AAA",
                            "key": "aaa"
                        },
                        {
                            "title": "BBB",
                            "key": "bbb"
                        },
                        {
                            "title": "CCC",
                            "key": "ccc",
                            "children": [
                                {
                                    "title": "DDD",
                                    "key": "ddd"
                                },
                                {
                                    "title": "EEE",
                                    "key": "eee"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "text",
                    "text": "多选框的值： #ES{$data.checkedKeys}"
                },
                {
                    "type": "text",
                    "text": "选中的值: #ES{$data.selectedKeys}"
                }
            ]
        }
    ]
}
```