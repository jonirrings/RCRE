// import * as React from 'react';
// import {Input} from 'antd';
// import {InputProps} from 'antd/lib/input/Input';
// import {InputConfig, InputPropsInterface} from '../../../../components/Input/Input';
//
// // const Search = Input.Search;
//
// class AntInput extends React.Component<InputPropsInterface, {}> {
//     constructor() {
//         super();
//
//         this.handleChange = this.handleChange.bind(this);
//         // this.handleSearch = this.handleSearch.bind(this);
//     }
//
//     private mapProps(props: InputConfig): InputProps {
//         return {
//             type: props.inputType,
//             id: props.id,
//             size: props.size,
//             disabled: props.disabled,
//             addonBefore: props.addonBefore,
//             addonAfter: props.addonAfter
//         };
//     }
//    
//     private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//         let target = event.currentTarget;
//         let value = target.value;
//
//         if (this.props.onChange) {
//             this.props.onChange(value);
//         }
//     }
//    
//     render() {
//         let info = this.props.info;
//
//         let childProps: {
//             value?: string;
//             onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
//         } = {};
//
//         if (this.props.onChange) {
//             childProps.value = this.props.value;
//             childProps.onChange = this.handleChange;
//         }
//
//         // if (this.props.info.inputType === 'search') {
//         //     return React.createElement(Search, Object.assign({
//         //         onSearch: this.handleSearch
//         //     }, this.mapProps(info), childProps));
//         // }
//
//         return React.createElement(Input, Object.assign(this.mapProps(info), childProps));
//     }
//     //
//     // private handleSearch(value: string) {
//     //     this.props.onSearch(value);
//     // }
// }
//
// export default AntInput;