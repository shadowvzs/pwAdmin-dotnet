import { type ControllerName, getApi } from '@api/index';

class BaseService<T> {
    protected api: T;
    protected token: string | null = null;

    constructor(
        baseApiUrl: string,
        controller: ControllerName,
    ) {
        this.api = getApi<T>(baseApiUrl, controller);
    }
}

export default BaseService;