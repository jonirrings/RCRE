FormItem 组件开发文档
=====================

Form组件开发需要遵循一下规范来进行开发.

## 起步
`src/components/Form/types.ts`提供了基础的Class和接口对象.
所以新的FormItem只需要继承基础Class和接口对象即可

```typescript
import { IsString, IsDefined } from 'class-validator'
import { FormItemBasicPropsInterface, FormItem } from '../components/Form/types'

// 例如, 如果实现一个Button组件, 只需要interface只需要继承 FormItemBasicPropsInterface
export class ButtonPropsInterface extends FormItemBasicPropsInterface {
    @IsString()
    @IsDefined()
    label: string;
    
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// 具体的React类也需要集成自FormItem, 而不是React.Component
class Button extends FormItem<ButtonPropsInterface, {}> {
    // defaultProps 也是必须的, 组件所需要的方法可以使用console.error来模拟
    static defaultProps = {
        onClick() {
            console.error('Button的onClick方法没有实现');
        }
    }
}

```

## 需要实现的函数

### isValid()
```
public isValid() {
    console.error(`${this.props.name} isValid() 没有被实现`);
    return false;
}
```