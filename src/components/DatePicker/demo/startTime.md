## 设置起始时间

通过`startTime`属性来设置起始时间

不过对于需要依赖外部接口要设置默认时间的场景，

需要注意的是，需要将datePicker所绑定的值和`startTime`以及`endTime`分开，

不然会出现startTime跟随DatePicker选项一同变化的情况。

```json
{
    "body": [
        {
            "type": "container",
            "model": "dateData",
            "dataProvider": [
                {
                    "mode": "ajax",
                    "namespace": "filter",
                    "config": {
                        "url": "/api/mock/dateStartTime",
                        "method": "GET"
                    },
                    "retMapping": {
                        "time": "#ES{$output.data.startTime}",
                        "startTime": "#ES{$output.data.startTime}",
                        "endTime": "#ES{$output.data.endTime}"
                    }
                }
            ],
            "children": [
                {
                    "type": "row",
                    "width": 400,
                    "children": [
                        {
                            "type": "datePicker",
                            "name": "filter.time",
                            "startTime": "2017-12-04"
                        }
                    ]
                }
            ]
        }
    ]
}
```