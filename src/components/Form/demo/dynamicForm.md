## 动态表单

可以根据不同条件，灵活控制输入框

```json
{
    "body": [
        {
            "type": "container",
            "model": "dynamicForm",
            "dataCustomer": {
                "customers": [
                    {
                        "mode": "submit",
                        "name": "formSubmit",
                        "config": {
                            "url": "https://api.github.com/repos/ApolloAuto/apollo",
                            "method": "GET",
                            "data": {
                                "name": "#ES{$trigger.formSubmit.name}"
                            }
                        }
                    }
                ] 
            },
            "children": [
                {
                    "type": "form",
                    "trigger": [
                        {
                            "event": "onSubmit",
                            "targetCustomer": "formSubmit",
                            "params": {
                                "username": "#ES{$args.username}",
                                "password": "#ES{$args.password}"
                            }
                        }
                    ],
                    "children": [
                        {
                            "type": "formGroup",
                            "label": "表单类型",
                            "control": {
                               "type": "radio",
                               "name": "formType",
                               "defaultValue": "mode1",
                               "options": [
                                   {
                                       "label": "mode1",
                                       "value": "mode1"
                                   },
                                   {
                                       "label": "mode2",
                                       "value": "mode2"
                                   }
                               ]
                           }
                        },
                        {
                            "type": "formGroup",
                            "label": "username",
                            "hidden": "#ES{$data.formType !== 'mode1'}",
                            "control": {
                                "type": "input",
                                "name": "username",
                                "required": true,
                                "errmsg": "请输入用户名"
                            }
                        },
                        {
                            "type": "formGroup",
                            "label": "password",
                            "hidden": "#ES{$data.formType !== 'mode2'}",
                            "control": {
                                "type": "input",
                                "name": "password",
                                "inputType": "password",
                                "required": true,
                                "errmsg": "请输入密码"
                            }
                        },
                        {
                            "type": "button",
                            "text": "submit",
                            "htmlType": "submit"
                        }
                    ]
                }
            ]
        }
    ]
}
```