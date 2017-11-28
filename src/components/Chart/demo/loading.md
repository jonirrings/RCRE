## 加载中

设置`loading`为true， 可以让折线图组件显示为加载中状态


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
                    "loading": "#ES{$data.$loading}"
                }
            ]
        }
    ]
}
```