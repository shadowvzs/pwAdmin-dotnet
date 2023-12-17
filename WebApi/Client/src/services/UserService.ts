import axios from 'axios';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

import TOKEN from '@app/di/token';
import delayPromise from '@utility/delayPromise';
import BaseService from '@services/BaseService';
import type { IUserService } from '@ts/services';
import type { IConfig, JWT } from '@ts/types';
import type { IUser, Users } from '@ts/dto';
import type { IUserApi } from '@ts/apis';
import type { UserListItemDto } from '@ts/api';

export type IToken = string;

@injectable()
class UserService extends BaseService<IUserApi> implements IUserService {
    private refreshTokenTimeout = 0;

    @observable
    public user: IUser | null = null;

    @action.bound
    public setUser(user: IUser | null) {
        this.user = user;
        if (user) {
            this.startRefreshTokenTimer(user.token);
        }
        this.api.$setBearerToken(user?.token);
    }

    constructor(
        @inject(TOKEN.IConfig) config: IConfig,
    ) {
        super(config.baseApiUrl, 'users');
        makeObservable(this);
    }

    private startRefreshTokenTimer(token: string) {
        const jwtToken: JWT.Payload = JSON.parse(window.atob(token.split('.')[1]));
        const timeout = jwtToken.exp * 1000 - Date.now() - (60 * 1000);
        this.stopRefreshTokenTimer();
        this.refreshTokenTimeout = window.setTimeout(() => this.refreshToken(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    public logout(): void {
        this.setUser(null);
        axios.defaults.headers.common = {};
    }

    public async login(loginDto: Users['login']['Request']): Promise<void> {
        const resp = await this.api.login(loginDto);
        this.setUser(resp.data);
        this.token = resp.data.token;
    }

    public async register(registerDto: Users['register']['Request']): Promise<void> {
        const resp = await this.api.register(registerDto);
        this.setUser(resp.data);
    }

    public async getUsers(data: Users['getUsers']['Request']): Promise<UserListItemDto[]> {
        const resp = await this.api.getUsers(data);
        return resp.data;
    }

    public async changeUserRank(data: Users['changeUserRank']['Request']): Promise<void> {
        await this.api.changeUserRank(data);
    }

    public async addGold(data: Users['addGold']['Request']): Promise<void> {
        await this.api.addGold(data);
    }

    public async refreshToken(): Promise<void> {
        await delayPromise(2000);
        console.info(`refreshToken`, this);
    }
}

export default UserService;