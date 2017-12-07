## 基础使用 Checkbox

设置`name`属性就可以使用

```json
{
    "body": [
        {
            "type": "container",
            "model": "checkboxDemo",
            "children": [
                {
                    "type": "checkbox",
                    "name": "checked",
                    "text": "isChecked"
                },
                {
                    "type": "text",
                    "text": "#ES{$data.checked}"
                }
            ]
        }
    ]
}
```