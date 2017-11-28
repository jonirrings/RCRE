## 加载中

可以结合container组件的DataProvider来动态加载数据

```json
{
    "body": [
        {
            "type": "container",
            "model": "loadingExample",
            "dataProvider": [
                {
                    "mode": "ajax",
                    "namespace": "select",
                    "config": {
                        "url": "/api/mock/select",
                        "method": "GET"
                    }
                }
            ],
            "children": [
                {
                    "type": "select",
                    "name": "loadingSelect",
                    "options": "#ES{$data.select.data}",
                    "defaultValue": "a"
                }
            ]
        }
    ]
}
```