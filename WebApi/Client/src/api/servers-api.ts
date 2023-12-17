import type { IServerApi } from '@ts/apis';

const ServersApi: Record<keyof Omit<IServerApi, '$request' | '$setBearerToken'>, string> = {
    details: `GET|details`,
    manageInstances: `POST|manage-instances`,
    checkInstancesStatus: `GET|check-instances-status`,
};

export default ServersApi;
