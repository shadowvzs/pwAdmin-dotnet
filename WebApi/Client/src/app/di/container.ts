import { Container } from 'inversify';

import TOKEN from '@app/di//token';
import PW_SERVER_DATA from '@pwserver/constants/server-data';
import config from '@app/config';
import UserService from '@services/UserService';
import ServerService from '@services/ServerService';
import type { IConfig } from '@ts/types';
import type { IServerService, IUserService } from '@ts/services';
import type { IPwServerData } from '@pwserver/types/responses';

const getContainer = () => {
    const myContainer = new Container({ skipBaseClassChecks: true });
    myContainer.bind<IConfig>(TOKEN.IConfig).toConstantValue(config);
    myContainer.bind<IPwServerData>(TOKEN.IPWServerData).toConstantValue(PW_SERVER_DATA);
    myContainer.bind<IUserService>(TOKEN.IUserService).to(UserService).inSingletonScope();
    myContainer.bind<IServerService>(TOKEN.IServerService).to(ServerService).inSingletonScope();
    return myContainer;
};

export default getContainer;
