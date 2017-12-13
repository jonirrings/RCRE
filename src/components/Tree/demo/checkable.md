## 多选框

添加`checkable`属性就能支持节点多选

```json
{
    "body": [
        {
            "type": "container",
            "model": "treeCheckable",
            "children": [
                {
                    "type": "tree",
                    "name": "tree",
                    "checkable": true,
                    "trigger": [
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
                                    "key": "ddd",
                                    "isLeaf": true
                                },
                                {
                                    "title": "EEE",
                                    "key": "eee",
                                    "isLeaf": true
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
                    "text": "选中的值: #ES{$data.tree}"
                }
            ]
        }
    ]
}
```