## 基础使用

`Input`组件需要借助`container`组件才能正常运行。
必须要设置一个`name`属性， 来代表输入框的数据

```json
{
    "body": [
        {
            "type": "container",
            "model": "form",
            "children": [
                {
                    "type": "input",
                    "name": "text"
                }
            ]
        }
    ]
}
```