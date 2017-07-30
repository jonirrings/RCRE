import axios, { AxiosRequestConfig } from 'axios';

export default async function ApiRequest(url: string, params: AxiosRequestConfig) {
    try {
        await axios(url, params);
        // await axios[method](url, params);   
    } catch (e) {
        // TODO error report
        console.error(e);
    }
}