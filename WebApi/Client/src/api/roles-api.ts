import type { IRoleApi } from '@ts/apis';

const rolesApi: Record<keyof Omit<IRoleApi, '$request' | '$setBearerToken'>, string> = {
    sendMail: 'asdasd'
};

export default rolesApi;
