import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export async function request(url: string, config: AxiosRequestConfig, proxy?: string): Promise<AxiosResponse> {
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

    return await axios(url, config);
}