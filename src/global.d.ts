/**
 * @file 全局定义文件
 * @author dongtiancheng
 */
declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    RCRE: any;
    RCRE_React: any;
    RCRE_ReactDOM: any;
    RCRE_VERSION: any;
    React: any;
    ReactDOM: any;
    RCRE_BasicContainer: any;
    RCRE_providerLoader: any;
    RCRE_customerLoader: any;
    RCRE_componentDriver: any;
    RCRE_clearStore: any;
}

declare var __VERSION__: any;

declare module 'json-format' {
    function parse(obj: any): string;

    namespace parse {
    }
    export = parse;
}
interface System {
    import (request: string): Promise<any>;
}
declare var System: System;