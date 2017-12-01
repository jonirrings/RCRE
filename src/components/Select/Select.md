# Select 下拉框

可以选择一组数据内容

## 代码演示

{{demo}}

## API
|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: | 
| name | Select的数据模型Key | string | true | - |
| options | 选项数组 | OptionConfig[] | false | - |
| optionsGroup | 带有组别的选项数组 | OptionGroupConfig[] | false | - |
| mode | 下拉框模式 | default,multiple,tags,combobox | false | default | 
| placeholder | 输入框默认文字 | string | false | - |
| size | 选择框大小 | default,small,large | false | default |
| disabled | 是否禁用 | boolean | false | false |
| defaultValue | 初始数据 | string | false | - |
| optionsMapping | 选项值映射 | object | false | - |


## OptionConfig 子选项
|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: |
| key | 显示的名称 | string | true | - |
| value | 选项的值 | string | true | - | 

## OptionGroupConfig 带有组的选项 
|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: |
| label| 组名 | string | true | - |
| options | OptionConfig[]  | 组内的选项 | true | - |

