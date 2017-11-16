## 基础使用

提供`series`和`categories`属性就可以工作了

```json
{
    "body": [
        {
            "type": "container",
            "model": "chart",
            "dataProvider": [
                {  
                    "mode": "ajax",
                    "namespace": "linechart",
                    "config": {
                        "url": "/api/mock/linechart",
                        "method": "GET"
                    }
                }
            ],
            "children": [
                {
                    "type": "lineChart",
                    "categories": "#ES{$data.linechart.data.categories}",
                    "series": "#ES{$data.linechart.data.series}"
                }
            ]
        }
    ]
}
```