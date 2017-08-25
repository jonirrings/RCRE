import * as _ from 'lodash';

export function runInContext(code: string, context: Object) {
    try {
        let params: string[] = [];
        let source: Object[] = [];
        _.each(context, (value, name) => {
            params.push(name);
            source.push(value);
        });
        params.push(`return ${code}`);
        let f = new Function(...params);
        return f.apply(context, source);
    } catch (e) {
        console.error(e);
        // TODO better error report   
    }
}

export function compileValueExpress<Config, Source>(props: Config, source: Source, $key: string): Config {
    if (!source) {
        return props;
    }

    _.each(props, (item, key) => {
        if (_.isString(item) && item.indexOf('$') >= 0) {
            let parseRet = runInContext(item, {
                [$key]: source
            });

            if (parseRet && parseRet[0] !== '$') {
                props[key] = parseRet;
            } else {
                // TODO use class-validator to reflect types and set default values
            }
        } else {
            props[key] = item;
        }
    });

    return props;
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