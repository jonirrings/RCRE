## 基础使用

显示分页器

```json
{
    "debug": true,
    "body": [
        {
            "type": "container",
            "model": "pagination",
            "data": {
            },
            "children":[
                {
                    "type": "pagination",
                    "name": "pages",
                    "total": 50,
                    "defaultCurrent": 3,
                    "pageSize": 4
                }
            ]
        }
    ]
}
```