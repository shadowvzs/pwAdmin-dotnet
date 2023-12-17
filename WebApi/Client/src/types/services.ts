import type { AxiosResponse } from 'axios';
import type { IUser, Servers, Users } from './dto';
import type { UserListItemDto } from './api';

export interface IServerService {
    details: () => Promise<Servers['details']['Response']>;
    manageInstances: (payload: Servers['manageInstances']['Request']) => Promise<Servers['manageInstances']['Response']>;
    checkInstancesStatus: (payload: Servers['checkInstancesStatus']['Request']) => Promise<Servers['checkInstancesStatus']['Response']>;
}

export interface IUserService {
    user: IUser | null;
    login: (loginDto: Users['login']['Request']) => Promise<void>;
    register: (registerDto: Users['register']['Request']) => Promise<void>;
    logout: () => void;
    getUsers: (data: Users['getUsers']['Request']) => Promise<UserListItemDto[]>;
    changeUserRank: (data: Users['changeUserRank']['Request']) => Promise<void>;
    addGold: (data: Users['addGold']['Request']) => Promise<void>;
    // unsure the below ones, but as reminder i let the following lines, for the future
    // changeStatus: (payload: { username: string; status: UserStatus; }) => AxiosResponse<{ token: string }>;
    // sendAnnocement: (payload: { message: string; type: string; }) => AxiosResponse<{ token: string }>;
}

export interface IRoleService {
    sendMail: (oayload: object) => AxiosResponse<void>;
}
