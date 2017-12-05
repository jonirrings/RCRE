export default {
    '跨Container传值': {
        index: require('raw-loader!./search/search.md'),
        demo: {
            basic: require('raw-loader!./search/demo/basic.md')
        }
    },
    '计数器': {
        index: require('raw-loader!./counter/counter.md'),
        demo: {
            basic: require('raw-loader!./counter/demo/basic.md')
        }
    }
};