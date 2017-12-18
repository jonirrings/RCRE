## Filter Test

test example for filter

```json
{
    "body": [
        {
            "type": "container",
            "model": "filter",
            "data": {
                "text": "name"
            },
            "children": [
                {
                    "type": "text",
                    "text": "#ES{$data.text}"
                }
            ]
        }
    ]
}
```