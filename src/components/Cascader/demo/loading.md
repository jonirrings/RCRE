## 异步加载

可以结合container组件的DataProvider来动态加载数据

```json
{
    "body": [
        {
            "type": "container",
            "model": "cascaderLoading",
            "dataProvider": [
                {
                    "mode": "ajax",
                    "namespace": "cascader",
                    "config": {
                        "url": "/api/mock/cascader",
                        "method": "GET"
                    }
                }
            ],
            "children": [
                {
                    "type": "cascader",
                    "name": "place_id",
                    "options": "#ES{$data.cascader.data}",
                    "defaultValue": ["a", "b", "c"]
                },
                {
                    "type": "text",
                    "text": "#ES{'selected value: ' + JSON.stringify($data.place_id)}"
                }
            ]
        }
    ]
}
```