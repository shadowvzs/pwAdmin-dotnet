import { EntityId } from './BaseEntity';

class ServerStatus {
    public id?: EntityId;
    public name!: string;
    public status!: boolean;
}

export default ServerStatus;