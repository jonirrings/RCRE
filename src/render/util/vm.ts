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
                                                    blackList: string[] = [],
                                                    isDeep: boolean = false): Config {
    let copy = _.cloneDeep(props);
    
    function parseExpression(reference: Object) {
        _.each(reference, (item, key) => {
            if (blackList.indexOf(key) >= 0) {
                return;
            }
            
            if (isExpression(item)) {
                let ret;
                try {
                    ret = runInContext(item, pair);
                } catch (e) {
                    ret = null;
                }
                
                reference[key] = ret;
            }
            
            if (!isDeep && (_.isPlainObject(item) || _.isArray(item))) {
                parseExpression(item);
            }
        });
    }
    
    parseExpression(copy);
    
    return copy;
}

export function isExpression(str: any) {
    return typeof str === 'string' && str.indexOf('$') >= 0;
}

export function filterExpressionData(obj: Object) {
    let copy = _.cloneDeep(obj);

    function walker(o: Object) {
        _.each(o, (val, name) => {
            if (isExpression(val)) {
                delete o[name];
            }

            if (_.isObjectLike(val)) {
                filterExpressionData(val);
            }
        });
    }

    walker(copy);

    return copy;
}

export function keepExpressionData(obj: Object) {
    let copy = _.cloneDeep(obj);

    function walker(o: Object) {
        _.each(o, (val, name) => {
            if (!isExpression(val)) {
                delete o[name];
            }

            if (_.isObjectLike(val)) {
                filterExpressionData(val);
            }
        });
    }

    walker(copy);

    return copy;
}

export function compileStaticTemplate<Source>(rawString: string, pair: compilePairType<Source>) {
    const templateRegex = /{{([^}]+)}}/g;

    return rawString.replace(templateRegex, (str, expression) => {
        if (!isExpression(expression)) {
            return expression;
        }

        console.log(expression, pair);
        // let ret = runInContext(expression, pair);

        let ret = null;
        if (!ret) {
            return expression;
        }

        return ret;
    });
}