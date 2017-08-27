import * as _ from 'lodash';

export function runInContext(code: string, context: Object) {
    let f: any;
    try {
        let params: string[] = [];
        let source: Object[] = [];
        _.each(context, (value, name) => {
            params.push(name);
            source.push(value);
        });
        params.push(`return ${code}`);
        f = new Function(...params);
        return f.apply(context, source);
    } catch (e) {
        console.error(e, f);
        // TODO better error report   
    }
}

export type compilePairType<S> = {
    [s: string]: S
};

export function compileValueExpress<Config, Source>(props: Config, pair: compilePairType<Source>): Config {
    let copy = _.cloneDeep(props);
    _.each(copy, (item, key) => {
        if (isExpression(item)) {
            let parseRet = runInContext(item, pair);

            if (parseRet && !isExpression(parseRet)) {
                copy[key] = parseRet;
            } else {
                // TODO use class-validator to reflect types and set default values
            }
        } else {
            copy[key] = item;
        }
    });

    return copy;
}

export function isExpression(str: any) {
    return typeof str === 'string' && str.indexOf('$') >= 0;
}

export function filterExpressionData(obj: Object) {
    _.each(obj, (val, name) => {
        if (isExpression(val)) {
            delete obj[name];
        }
    });

    return obj;
}