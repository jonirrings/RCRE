import * as _ from 'lodash';

// TODO Use Token parser for better parse

/**
 * 安全运行沙箱
 * 
 * @param {string} code
 * @param {Object} context
 * @returns {any}
 */
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

/**
 * 解析ExpressString
 * 
 * @param {string} str
 * @param {Object} context
 * @returns {any}
 */
export function parseExpressString(str: string, context: Object) {
    const ESPattern = /#ES\{([^#]+)\}/g;
    if (!isExpression(str)) {
        return str;
    }
     
    str = str.replace(ESPattern, (total, code) => {
        let result = null;
        try {
            result = runInContext(code, context);
        } catch (e) {}
        
        if (_.isNil(result)) {
            return '';
        }
        
        if (_.isObjectLike(result)) {
            return JSON.stringify(result);
        }
        
        if (typeof result === 'function') {
            return result.toString();
        }
        
        if (typeof result === 'string') {
            return '"' + result + '"';
        }
        
        return result;
    });
    
    try {
        return runInContext(str, {});   
    } catch (e) {
        return str;
    }
}

/**
 * 安全属性指针
 * 
 * @param {Object} obj
 * @param {(string | number)[]} keys
 * @returns {any}
 */
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
            // console.log(item);
            if (blackList.indexOf(key) >= 0) {
                return;
            }
            
            if (isExpression(item)) {
                console.log(item, pair, parseExpressString(item, pair));
                reference[key] = parseExpressString(item, pair);
            }
            
            if (isDeep && (_.isPlainObject(item) || _.isArray(item))) {
                parseExpression(item);
            }
        });
    }
    
    parseExpression(copy);
    
    return copy;
}

export function isExpression(str: any) {
    const ESPattern = /#ES\{([^#]+)\}/g;
    return ESPattern.test(str);
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