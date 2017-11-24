## 基础使用

显示分页器

```json
{
    "body": [
        {
            "type": "container",
            "model": "pagination",
            "data": {
            },
            "children":[
                {
                    "type": "pagination",
                    "total": 100,
                    "defaultPageSize": 10,
                    "pageSize": 10,
                    "defaultCurrent": 1
                }
            ]
        }
    ]
}
```