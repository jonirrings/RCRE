## 基础使用

Tree组件需要在container组件的控制下才能运行。

```json
{
    "body": [
        {
            "type": "container",
            "model": "treeBasic",
            "children": [
                {
                    "type": "tree",
                    "name": "tree",
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
                                    "key": "eee",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "text",
                    "text": "选中的节点： #ES{$data.tree}"
                }
            ]
        }
    ]
}
```