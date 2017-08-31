import axios, {AxiosRequestConfig} from 'axios';

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
    }

    return axios(url, config);
}