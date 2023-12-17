import { Container } from 'inversify';

import config from '@app/config';
import type { IConfig } from '@ts/types';
import { IServerService, IUserService } from '@ts/services';
import UserService from '@services/UserService';
import ServerService from '@services/ServerService';
import TOKEN from './token';

const getContainer = () => {
    const myContainer = new Container({ skipBaseClassChecks: true });
    myContainer.bind<IConfig>(TOKEN.IConfig).toConstantValue(config);
    myContainer.bind<IUserService>(TOKEN.IUserService).to(UserService).inSingletonScope();
    myContainer.bind<IServerService>(TOKEN.IServerService).to(ServerService).inSingletonScope();
    return myContainer;
};

export default getContainer;
