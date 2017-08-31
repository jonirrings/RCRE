declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    RCRE: any;
    RCRE_React: any;
    RCRE_ReactDOM: any;
}

declare module 'json-format' {
    function parse(obj: any): string;

    namespace parse {
    }
    export = parse;
}