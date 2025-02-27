import axios from "axios";
import {config, loadConfig} from '../utility/config'
export abstract class BaseRequestService {
    axios: Axios.AxiosInstance = axios.create({
        timeout: 30000, // Set a timeout for requests

    });;
    accessToken?: string;
    url: string = `${config?.backendUrl}/api/`;

    constructor({ url, headers, token, contentType }: ApiInstanceOptions = {}) {
        loadConfig().then(() => {
            this.accessToken = token;
            if(url) this.url = url;
            else this.url = `${config?.backendUrl}/api/`
    
            this.axios.interceptors.request.use(
                (config) => {
                    // Do something before request is sent
                    // For example, add an authorization token
                    if(config.headers){
                        if (this.accessToken) {
                            config.headers["Authorization"] = `Bearer ${this.accessToken}`;
                        }
                        
                        if(contentType) config.headers['Content-Type'] = contentType; 
                        
                        if(headers) headers.forEach(x => {
                            if(config.headers) config.headers[x.name] = x.value
                        })
    
                    }
    
                    return config;
                },
                (error) => {
                    // Do something with request error
                    return Promise.reject(error);
                }
            );
            this.axios.interceptors.response.use(
                (config) => {
            
                    return config;
                },
                (error) => {
                    // Do something with request error
                    return Promise.reject(error);
                }
            );

        })
    }

    protected post = async <TRequest = any, TResponse = any>(url: string, body: TRequest, headers?: Record<string, string>, options?: Axios.AxiosXHRConfigBase<TResponse>) => await this.axios.post<TResponse>(this.url + url, body, { ...options, headers});
    protected get = async <TResponse = any>(url: string, headers?: Record<string, string>, options?: Axios.AxiosXHRConfigBase<TResponse>) => await this.axios.get<TResponse>(this.url + url, { ...options, headers});
    protected put = async <TRequest = any, TResponse = any>(url: string, body: TRequest, headers?: Record<string, string>, options?: Axios.AxiosXHRConfigBase<TResponse>) => await this.axios.put<TResponse>(this.url + url, body, { ...options, headers});
    protected delete = async <TResponse = any>(url: string, headers?: Record<string, string>, options?: Axios.AxiosXHRConfigBase<TResponse>) => await this.axios.delete<TResponse>(this.url + url, { ...options, headers});

}

export interface ApiInstanceOptions {
    url?: string; 
    headers?: Array<{ name: string; value: string }>; 
    token?: string; 
    contentType?: string
}