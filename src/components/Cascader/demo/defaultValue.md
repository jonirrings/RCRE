## 默认值

添加`defaultValue`属性就可以设置默认值

```json
{
    "body": [
        {
           "type": "container",
           "model": "defaultData",
           "data": {
               "source": [
                   {
                       "label": "A",
                       "value": "a",
                       "children": [
                           {
                               "label": "B",
                               "value": "b",
                               "children": [
                                   {
                                       "label": "C",
                                       "value": "c"
                                   }
                               ]
                           }
                       ]
                   },
                   {
                       "label": "123",
                       "value": "123",
                       "children": [
                           {
                               "label": "456",
                               "value": "456"
                           }
                       ]
                   }
               ]
           },
           "children": [
               {
                   "type": "cascader",
                   "name": "place_id",
                   "options": "#ES{$data.source}",
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