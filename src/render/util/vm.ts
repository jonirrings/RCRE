import * as _ from 'lodash';

export function runInContext(code: string, context: Object) {
    if (!_.isPlainObject(context)) {
        throw new TypeError('context argument must be an object');
    }
    
    if (typeof code === 'string') {
        if (!/^\s+function/.test(code)) {
            code = `function() { return (${code})}`;
        }
    }
    
    if (!code) {
        throw new TypeError('code must be a evaluable string');
    }
    
    let func = new Function('context', `
        var scope = this;
        var window = scope;
        var global = scope;
        with (scope) {
            return (${code}).call(context);
        }
    `);
    
    return func.call(context);
}

export function safePointer(obj: Object, keys: (string|number)[]) {
    let target = obj;

    if (!Array.isArray(keys) && typeof keys !== 'string') {
        return target;
    }

    let sequence = keys || [keys];

    while (sequence.length > 0) {
        let key = sequence.shift();

        if (_.isObjectLike(target) && !_.isNil(key) && key in target) {
            target = target[key];
        } else {
            return null;
        }
    }

    return target;
}

export type compilePairType<S> = {
    [s: string]: S
};

export function compileValueExpress<Config, Source>(props: Config,
                                                    pair: compilePairType<Source>,
                                                    blackList: string[] = []): Config {
    let copy = _.cloneDeep(props);

    function parseExpression(reference: Object, val: any, name: string | number) {
        if (isExpression(val)) {
            let parseRet = runInContext(val, pair);

            if (!_.isNil(parseRet)) {
                reference[name] = parseRet;
            } else {
                // TODO use class-validator to reflect types and set default values
            }
        }

        if (_.isPlainObject(val) && typeof name === 'string' && blackList.indexOf(name) < 0) {
            reference[name] = compileValueExpress(val, pair, blackList);
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