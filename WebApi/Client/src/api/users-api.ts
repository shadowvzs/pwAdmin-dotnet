import type { IUserApi } from '@ts/apis';

const usersApi: Record<keyof Omit<IUserApi, '$request' | '$setBearerToken'>, string> = {
    login: `POST|login`,
    register: `POST|register`,
    getUsers: `GET|`,
    changeUserRank: `POST|change-user-rank`,
    addGold: `POST|add-gold`,

    changeStatus: `POST|changeStatus`,
    sendAnnocement: `POST|sendAnnocement`,
};

export default usersApi;
