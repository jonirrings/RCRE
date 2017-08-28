import axios, {AxiosRequestConfig} from 'axios';

export function request(url: string, config: AxiosRequestConfig) {
    if (!config.method || /^get$/i.test(config.method)) {
        config.params = config.data;
    }

    return axios(url, config);
}