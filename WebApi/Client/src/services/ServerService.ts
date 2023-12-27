import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';

import TOKEN from '@app/di/token';
import BaseService from '@services/BaseService';
import type { IServerService } from '@ts/services';
import type { IConfig } from '@ts/types';
import type { Servers } from '@ts/dto';
import type { IServerApi } from '@ts/apis';

export type IToken = string;

@injectable()
class ServerService extends BaseService<IServerApi> implements IServerService {
    constructor(
        @inject(TOKEN.IConfig) config: IConfig,
    ) {
        super(config.baseApiUrl, 'servers');
        makeObservable(this);
    }

    public details = async(): Promise<Servers['details']['Response']> => {
        const resp = await this.api.details();
        return resp.data;
    };

    public manageInstances = async (payload: Servers['manageInstances']['Request']): Promise<Servers['manageInstances']['Response']> => {
        const resp = await this.api.manageInstances(payload);
        return resp.data;
    };

    public checkInstancesStatus = async (payload: Servers['checkInstancesStatus']['Request']): Promise<Servers['checkInstancesStatus']['Response']> => {
        const resp = await this.api.checkInstancesStatus(payload);
        return resp.data;
    };
}

export default ServerService;