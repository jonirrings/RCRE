## 更改每页的大小

添加`showSizeChanger`就会显示页面尺寸调整控件

```json
{
    "body": [
        {
            "type": "container",
            "model": "size",
            "children": [
                {
                    "type": "pagination",
                    "name": "sizeChange",
                    "showSizeChanger": true,
                    "total": 50
                }
            ]
        }
    ]
}
```