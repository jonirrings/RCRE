import * as moment from 'moment';

/**
 * 时间表达式解析器
 *
 * @param {string} timeStr
 * @returns {moment.Moment}
 */
export function parseTimeString(timeStr: string): moment.Moment {
    const validTimeKeyWords = {
        's': 'seconds',
        'm': 'minutes',
        'h': 'hours',
        'w': 'weeks',
        'd': 'days',
        'M': 'months',
        'Y': 'years'
    };

    // maybe this is fixed date value
    if (timeStr.indexOf('now') < 0) {
        let date = moment(timeStr);

        if (!date.isValid()) {
            console.error(`inValid timeString: ${timeStr}, unknown date format`);
            return moment();
        }

        return date;
    }

    const startOfNow = /^\s*now/;

    if (!startOfNow.test(timeStr)) {
        console.error(`inValid timeString: ${timeStr}, now should be in the first`);
        return moment();
    }

    const timeTokenRegex = /(?:\s*(\+|-)\s*)?(\d+)(s|m|h|d|M|Y)/g;
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

    return nowTime;
}