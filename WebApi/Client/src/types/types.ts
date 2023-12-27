import type { IAppStore } from './stores';

export interface IConfig {
    version: number;
    baseApiUrl: string;
}

export interface IDependencies {
    config: IConfig;
}

export type NavigationFunction = (to: string | number, config?: Record<string, string>) => void;

export type AxiosResponse<T> = Promise<{ data: T }>;

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JWT {
    export interface Payload {
        exp: number;
        iat: number;
        nbf: number;
        email: string;
        nameid: [string, string];
    }

    export interface Signature {
        alg: string;
        typ: 'JWT'
    }
}

export interface ViewInjector {
    app: IAppStore;
}