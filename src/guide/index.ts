export default {
    'HelloWorld': {
        title: 'HelloWorld',
        md: require('raw-loader!./Helloworld.md')
    },
    'containerComponent': {
        title: '持有数据的组件',
        md: require('raw-loader!./ContainerComponent.md')
    },
    'expressionString': {
        title: 'Expression String',
        md: require('raw-loader!./ExpressionString.md')
    },
    'dataProvider': {
        title: 'DataProvider',
        md: require('raw-loader!./DataProvider.md')
    },
    'nestContainer': {
        title: '嵌套的Container组件',
        md: require('raw-loader!./NestContainer.md')
    },
    'layout': {
        title: '布局系统',
        md: require('raw-loader!./LayoutSystem.md')
    }
};