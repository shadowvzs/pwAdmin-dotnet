import { BaseEntity } from './BaseEntity';

class Config extends BaseEntity {
    public type?: 'string' | 'json';
    public content!: string;
}

export default Config;