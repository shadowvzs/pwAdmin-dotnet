import type { AxiosInstance, AxiosResponse } from 'axios';
import { UserStatus } from './enums';
import type { Servers, Users } from './dto';

export interface IServerApi extends BaseApi {
    details: () => Promise<AxiosResponse<Servers['details']['Response']>>;
    manageInstances: (payload: Servers['manageInstances']['Request']) => Promise<AxiosResponse<Servers['manageInstances']['Response']>>;
    checkInstancesStatus: (payload: Servers['checkInstancesStatus']['Request']) => Promise<AxiosResponse<Servers['checkInstancesStatus']['Response']>>;
}

export interface IUserApi extends BaseApi {
    login: (payload: Users['login']['Request']) => Promise<AxiosResponse<Users['login']['Response']>>;
    register: (payload: Users['register']['Request']) => Promise<AxiosResponse<Users['register']['Response']>>;
    getUsers: (payload: Users['getUsers']['Request']) => Promise<AxiosResponse<Users['getUsers']['Response']>>;
    changeUserRank: (payload: Users['changeUserRank']['Request']) => Promise<AxiosResponse<Users['changeUserRank']['Response']>>;
    addGold: (payload: Users['addGold']['Request']) => Promise<AxiosResponse<Users['addGold']['Response']>>;

    changeStatus: (payload: { username: string; status: UserStatus; }) => AxiosResponse<{ token: string }>;
    sendAnnocement: (payload: { message: string; type: string; }) => AxiosResponse<{ token: string }>;
}

export interface IRoleApi extends BaseApi {
    sendMail: (payload: object) => AxiosResponse<void>;
}

export interface BaseApi {
    $setBearerToken: (token?: string) => void;
    $request: AxiosInstance;
}