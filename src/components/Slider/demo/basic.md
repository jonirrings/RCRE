## 基础使用

`slider`组件需要配合`container`组件才能正常运行

```json
{
    "debug": true,
    "body": [
        {
            "type": "container",
            "model": "basic",
            "children": [
                {
                    "type": "slider",
                    "name": "demo"
                },
                {
                    "type": "text",
                    "text": "#ES{$data.demo}" 
                }
            ]
        }
    ]
}
```