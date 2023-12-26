import axios, { AxiosInstance } from 'axios';

import type { AxiosResponse, HttpMethods } from '@ts/types';
import type { BaseApi } from '@ts/apis';
import rolesApi from './roles-api';
import usersApi from './users-api';
import serversApi from './servers-api';

const apis: AxiosInstance[] = [];
export const createServiceFromApi = <T = unknown>(list: Record<string, string>, api: AxiosInstance) => {
    // api.interceptors.response.use(res => {
    //     if (res.data && typeof res.data === 'object') {
    //         console.log(res.data);
    //         console.log(api.defaults.headers.common.Authorization);
    //         console.log(axios.defaults.headers.common.Authorization);
    //         if (Reflect.has(res.data, 'token')) {
    //             Reflect.set(axios.defaults.headers.common, 'Authorization', `Bearer ${Reflect.get(res.data, 'token')}`);
    //         }
    //         console.log(api.defaults.headers.common.Authorization);
    //         console.log(axios.defaults.headers.common.Authorization);
    //     }
    //     return res;
    // });
    const buildRequestParams = (key: string) => (payload?: Record<string, string>, data?: object, onUploadProgress?: (ev: ProgressEvent) => void) => {
        const [method, url] = list[key].split('|') as [method: HttpMethods, url: string];
        let newUrl = url;
        if (url.includes(':') && payload) {
            Object.keys(payload)
                .filter(x => url.includes(`:${x}`))
                .forEach(x => {
                    let value = payload[x];
                    if (x === 'url') {
                        value = encodeURIComponent(value);
                    } else if (x === 'search') {
                        value = value.replace('?q=', '');
                    }
                    newUrl = newUrl.replace(`:${x}`, value);
                });
        }

        const result: [url: string, requestData?: object, config?: { onUploadProgress?: (ev: ProgressEvent) => void }] = [
            newUrl,
        ];

        if (['POST', 'PUT'].includes(method) && data instanceof FormData) {
            result.push(data);
            if (onUploadProgress) {
                result.push({ onUploadProgress });
            }
        } else if (['POST', 'PUT'].includes(method) && !data) {
            result.push(payload);
        }

        const fetchMethod = api[method.toLowerCase() as Lowercase<HttpMethods>] as (
            ...args: unknown[]
        ) => AxiosResponse<unknown>;
        return fetchMethod(...result);
    };

    const strictApi = Object.keys(list).reduce(
        (obj: Record<string, ReturnType<typeof buildRequestParams>>, methodName: string) => {
            Reflect.set(obj, methodName, buildRequestParams(methodName));
            return obj;
        },
        {} as Record<string, ReturnType<typeof buildRequestParams>>
    ) as T;

    Reflect.set(strictApi as BaseApi, '$request', api);
    Reflect.set(strictApi as BaseApi, '$setBearerToken', (token?: string) => {
        apis.forEach(a => {
            if (token) {
                Reflect.set(a.defaults.headers.common, 'Authorization', `Bearer ${token}`);
            } else {
                Reflect.deleteProperty(a.defaults.headers.common, 'Authorization');
            }
        });
    });

    return strictApi;
};

const controllerMap = {
    servers: serversApi,
    users: usersApi,
    roles: rolesApi,
};

export type ControllerName = keyof typeof controllerMap;

export const getApi = <T>(baseApiUrl: string, controller: ControllerName): T => {
    const api = axios.create({
        baseURL: baseApiUrl + controller,
        timeout: 1000,
    });
    apis.push(api);
    return createServiceFromApi<T>(controllerMap[controller], api);
};
