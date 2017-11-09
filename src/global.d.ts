declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    RCRE: any;
    RCRE_React: any;
    RCRE_ReactDOM: any;
    RCRE_VERSION: any;
    RCRE_BasicContainer: any;
    RCRE_providerLoader: any;
    RCRE_customerLoader: any;
    RCRE_componentDriver: any;
}

declare var __VERSION__: any;

declare module 'json-format' {
    function parse(obj: any): string;

    namespace parse {
    }
    export = parse;
}