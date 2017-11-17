export default {
    button: {
        index: require('raw-loader!./Button/Button.md'),
        demo: {
            basic: require('raw-loader!./Button/demo/basic.md'),
            confirm: require('raw-loader!./Button/demo/confirm.md'),
            icon: require('raw-loader!./Button/demo/icon.md'),
            disabled: require('raw-loader!./Button/demo/disabled.md'),
            loading: require('raw-loader!./Button/demo/loading.md'),
            href: require('raw-loader!./Button/demo/href.md')
        }
    },
    cascader: {
        index: require('raw-loader!./Cascader/Cascader.md'),
        demo: {
            basic: require('raw-loader!./Cascader/demo/basic.md')
        }
    },
    table: {
        index: require('raw-loader!./Table/Table.md'),
        demo: {
            basic: require('raw-loader!./Table/demo/basic.md'),
            customerRender: require('raw-loader!./Table/demo/customerRender.md'),
            columnsMapping: require('raw-loader!./Table/demo/columnsMapping.md'),
            dataSourceMapping: require('raw-loader!./Table/demo/dataSourceMapping.md'),
            tableDrill: require('raw-loader!./Table/demo/tableDrill.md')
        }
    },
    input: {
        index: require('raw-loader!./Input/Input.md'),
        demo: {
            basic: require('raw-loader!./Input/demo/basic.md'),
            password: require('raw-loader!./Input/demo/password.md'),
            addonInput: require('raw-loader!./Input/demo/addonInput.md'),
            sync: require('raw-loader!./Input/demo/sync.md'),
            disabled: require('raw-loader!./Input/demo/disabled.md'),
            placeholder: require('raw-loader!./Input/demo/placeholder.md'),
            readOnly: require('raw-loader!./Input/demo/readOnly.md')
        }
    },
    modal: {
        index: require('raw-loader!./Modal/Modal.md'),
        demo: {
            basic: require('raw-loader!./Modal/demo/basic.md')
        }
    },
    form: {
        index: require('raw-loader!./Form/Form.md'),
        demo: {
            basic: require('raw-loader!./Form/demo/basic.md')
        }
    },
    text: {
        index: require('raw-loader!./Text/Text.md'),
        demo: {
            basic: require('raw-loader!./Text/demo/basic.md'),
            link: require('raw-loader!./Text/demo/link.md'),
            thousand: require('raw-loader!./Text/demo/thousand.md')
        }
    },
    datePicker: {
        index: require('raw-loader!./DatePicker/DatePicker.md'),
        demo: {
            basic: require('raw-loader!./DatePicker/demo/basic.md'),
            startTime: require('raw-loader!./DatePicker/demo/startTime.md')
        }
    },
    tabs: {
        index: require('raw-loader!./Tabs/Tabs.md'),
        demo: {
            basic: require('raw-loader!./Tabs/demo/basic.md'),
            animated: require('raw-loader!./Tabs/demo/noAnimate.md'),
            tabType: require('raw-loader!./Tabs/demo/tabType.md'),
            tabContainer: require('raw-loader!./Tabs/demo/tabContainer.md')
        }
    },
    lineChart: {
        index: require('raw-loader!./Chart/LineChart.md'),
        demo: {
            basic: require('raw-loader!./Chart/demo/basic.md')
        }
    },
    trend: {
        index: require('raw-loader!./Trend/Trend.md'),
        demo: {
            basic: require('raw-loader!./Trend/demo/basic.md')
        }
    }
};