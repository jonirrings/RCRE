## 显示数据总量

使用`showTotal`属性就能额外显示数据总量和区域

ExpressionString额外嵌入的变量请看下么的表格

```json
{
    "body": [
        {
            "type": "container",
            "model": "total",
            "children": [
                {
                    "type": "pagination",
                    "name": "showTotal",
                    "showTotal": "#ES{$range[0]}-#ES{$range[1]}, 总量: #ES{$total}",
                    "total": 50
                }
            ]
        }
    ]
}
```