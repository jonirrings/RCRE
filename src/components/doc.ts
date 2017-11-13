export default {
    button: {
        index: require('raw-loader!./Button/Button.md'),
        demo: {
            basic: require('raw-loader!./Button/demo/basic.md'),
            confirm: require('raw-loader!./Button/demo/confirm.md'),
            icon: require('raw-loader!./Button/demo/icon.md'),
            disabled: require('raw-loader!./Button/demo/disabled.md'),
            loading: require('raw-loader!./Button/demo/loading.md')
        }
    },
    cascader: {
        index: require('raw-loader!./Cascader/Cascader.md'),
        demo: {
            basic: require('raw-loader!./Cascader/demo/basic.md')
        }
    }
};