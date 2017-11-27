## 加载中

添加`loading`属性就能加载中。

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
                    "loading": "#ES{$data.$loading}",
                    "defaultValue": "a"
                }
            ]
        }
    ]
}
```