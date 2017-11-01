import * as moment from 'moment';
import * as _ from 'lodash';
import {runInContext} from './vm';

const isValidTimeStr = /^\$now((?:\s*(\+|-)\s*)?(\d+)(s|m|h|d|M|Y|w))*$/;

export function isTimeString(timeStr: string): boolean {
    return isValidTimeStr.test(timeStr);
}

/**
 * 时间表达式解析器
 *
 * @param {string} timeStr
 * @returns {moment.Moment}
 */
export function parseTimeString(timeStr: string): string {
    const validTimeKeyWords = {
        's': 'seconds',
        'm': 'minutes',
        'h': 'hours',
        'w': 'weeks',
        'd': 'days',
        'M': 'months',
        'Y': 'years'
    };
    
    const isValid = isTimeString(timeStr);
    
    if (!isValid) {
        return timeStr;
    }

    const timeTokenRegex = /(?:\s*(\+|-)\s*)?(\d+)(s|m|h|d|M|Y|w)/g;
    let pattern = timeTokenRegex.exec(timeStr);
    let nowTime = moment();

    while (pattern) {
        let operator = pattern[1] || '+';
        let count = parseInt(pattern[2], 10);
        let method = validTimeKeyWords[pattern[3]];

        switch (operator) {
            case '-':
                nowTime = nowTime.subtract(count, method);
                break;

            default:
            case '+':
                nowTime = nowTime.add(count, method);
                break;
        }
        pattern = timeTokenRegex.exec(timeStr);
    }

    return nowTime.valueOf().toString();
}

export function compileTimeExpression<Config>(props: Config, format: string = 'YYYY-MM-DD HH:mm:ss') {
    let copy = _.cloneDeep(props);

    _.each(copy, (val, name) => {
        if (isTimeString(val)) {
            let ret = parseTimeString(val);
            let timestamps = runInContext(ret, {});
            let time = moment(timestamps);

            if (time.isValid()) {
                copy[name] = time.format(format);
            }
        }
    });

    return copy;
}