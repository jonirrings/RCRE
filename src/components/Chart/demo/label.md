## 在图表上显示文字

添加`chartLabel`属性就可以在折线图上面显示文字

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
                    "series": "#ES{$data.linechart.data.series}",
                    "chartLabel": true
                }
            ]
        }
    ]
}
```