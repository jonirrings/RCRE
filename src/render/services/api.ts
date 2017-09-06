import axios, {AxiosRequestConfig} from 'axios';
import {notification} from 'antd';

export function request(url: string, config: AxiosRequestConfig, proxy?: string) {
    if (proxy) {
        let proxyOptions: AxiosRequestConfig = {
            url: proxy!,
            method: config.method,
            data: {
                url: config.url || url,
                method: config.method,
                data: config.data
            }
        };

        url = proxy;
        config = proxyOptions;
    }

    if (!config.method || /^get$/i.test(config.method)) {
        config.params = config.data;
        config.method = 'GET';
    }

    return axios(url, config).catch(err => {
        notification.error({
            message: '接口调用失败',
            description: `${err.message}`
        });
    });
}