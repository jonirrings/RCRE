/**
 * @file BOS SDK
 * @author dongtiancheng@baidu.com
 */

const SDK = require('bce-sdk-js');

const BosClient = SDK.BosClient;

const config = {
    endpoint: 'http://miskit.gz.bcebos.com',
    credentials: {
        ak: '5642d6d5a49c431ab5e968375493a58c',
        sk: '500b77c4bbcd478da1854105bbda8675'
    }
};

let bucket = 'miskit';
let client = new BosClient(config);

exports.generateBosURL = function (key) {
    return `${config.endpoint}/v1/miskit/${key}`;
};

exports.getKeyFromBosURL = function (url) {
    return url.replace(`${config.endpoint}/v1/miskit/`, '');
};

/**
 * 上传字符串
 *
 * @param {string} key 资源key
 * @param {string} string 内容
 * @param {Object} options 配置
 * @return {Promise<any>}
 */
exports.putString = function (key, string, options) {
    return client.putObjectFromString(bucket, key, string, options);
};

/**
 * 获取字符串
 *
 * @param {string} key 资源Key
 * @return {Promise<any>}
 */
exports.getString = function (key) {
    return client.getObject(bucket, key);
};
