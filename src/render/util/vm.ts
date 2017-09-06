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
        // console.error(e, f);
        return null;
        // TODO better error report   
    }
}

export type compilePairType<S> = {
    [s: string]: S
};

export function compileValueExpress<Config, Source>(props: Config, pair: compilePairType<Source>): Config {
    let copy = _.cloneDeep(props);

    function parseExpression(reference: Object, val: any, name: string | number) {
        if (isExpression(val)) {
            let parseRet = runInContext(val, pair);

            if (!_.isNil(parseRet)) {
                reference[name] = parseRet;
            } else {
                // TODO use class-validator to reflect types and set default values
            }

            if (_.isPlainObject(val)) {
                reference[name] = compileValueExpress(val, pair);
            }
        }
    }
    
    _.each(copy, (item, key) => {
        if (isExpression(item)) {
            let parseRet = runInContext(item, pair);

            if (!_.isNil(parseRet)) {
                copy[key] = parseRet;
            } else {
                // TODO use class-validator to reflect types and set default values
            }
        } else if (_.isPlainObject(item) || _.isArray(item)) {
            _.each(item, (val, name) => {
                parseExpression(item, val, name);
            });
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

export function compileStaticTemplate<Source>(rawString: string, pair: compilePairType<Source>) {
    const templateRegex = /{{([^}]+)}}/g;

    return rawString.replace(templateRegex, (str, expression) => {
        if (!isExpression(expression)) {
            return expression;
        }

        let ret = runInContext(expression, pair);

        if (!ret) {
            return expression;
        }

        return ret;
    });
}