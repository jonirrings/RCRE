## 点选多个节点

添加`multiple`属性来支持点选多个节点

```json
{
    "body": [
        {
            "type": "container",
            "model": "treeMultiple",
            "children": [
                {
                    "type": "tree",
                    "name": "tree",
                    "checkable": true,
                    "multiple": true,
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