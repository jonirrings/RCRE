// import * as React from 'react';
// import {Select} from 'antd';
// import {OptionConfig, SelectConfig, SelectPropsInterface} from '../../../../components/Select/Select';
// import {OptionProps, SelectProps, SelectValue} from 'antd/lib/select';
//
// const Option = Select.Option;
//
// class AntSelect extends React.Component<SelectPropsInterface, {}> {
//     constructor() {
//         super();
//
//         this.handleChange = this.handleChange.bind(this);
//     }
//
//     render() {
//         let Options = this.props.info.options.map(op => {
//             return React.createElement(Option, Object.assign(this.mapOptionOptions(op), {
//                 key: op.key
//             }), op.key);
//         });
//
//         return React.createElement(Select, Object.assign(this.mapOptions(this.props.info), {
//             value: this.props.value,
//             onChange: this.handleChange,
//             style: {
//                 width: '100%'
//             }
//         }), Options);
//     }
//
//     private mapOptionOptions(props: OptionConfig): OptionProps {
//         return {
//             disabled: props.disabled,
//             value: props.value
//         };
//     }
//
//     private handleChange(value: SelectValue) {
//         if (this.props.onChange) {  
//             this.props.onChange(value);
//         }
//     }
//
//     private mapOptions(props: SelectConfig): SelectProps {
//         return {
//             mode: props.mode,
//             allowClear: props.allowClear,
//             placeholder: props.placeholder,
//             size: props.size,
//             disabled: props.disabled
//         };
//     }
// }
//
// export default AntSelect;